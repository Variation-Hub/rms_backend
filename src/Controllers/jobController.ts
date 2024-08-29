import { Request, Response } from 'express';
import Job from '../Models/JobModel';
import Application from '../Models/applicationModel';
import Counter from '../Models/JobCounter'
import ACRUserModel from '../Models/ACRUserModel';

// Create a new job
export const createJob = async (req: Request, res: Response) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {},
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const job_id = `JD${String(counter?.seq).padStart(3, '0')}`;

        const newJob = await Job.create({ ...req.body, job_id });
        return res.status(200).json({
            message: "Job created successfully",
            status: true,
            data: newJob
        })
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get all jobs
export const getJobs = async (req: any, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;
        const userId = req.user._id;

        // Count total number of jobs
        const totalCount = await Job.find().countDocuments();

        // Aggregate jobs with lookup to JobApplication collection
        const data = await Job.aggregate([
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: 'jobapplications', // The JobApplication collection
                    localField: 'applicants', // Job applicants' IDs
                    foreignField: '_id', // The field in JobApplication that corresponds to those IDs
                    as: 'applicantsInfo' // Store the looked-up documents
                }
            }
        ]);

        // Process the aggregated results
        const jobsWithProcessedData = data.map((job: any) => {
            const now = new Date();
            const jobTimeLeft = Math.max(new Date(job.timerEnd).getTime() - now.getTime(), 0);

            // Filter applicants to check if the user ID matches
            const matchingApplicant = job.applicantsInfo.find((applicant: any) => applicant.user_id.toString() === userId.toString());

            let processedApplicantInfo = {};
            if (matchingApplicant) {
                const cvTimeLeft = Math.max(new Date(matchingApplicant.timer).getTime() - now.getTime(), 0);

                processedApplicantInfo = {
                    status: matchingApplicant.status,
                    no_of_resouces: matchingApplicant.no_of_resouces,
                    cv: matchingApplicant.cv,
                    cv_timer_end: matchingApplicant.timer,
                    cv_time_left: cvTimeLeft
                };
            }

            return {
                _id: job._id,
                job_id: job.job_id,
                job_title: job.job_title,
                no_of_roles: job.no_of_roles,
                start_date: job.start_date,
                publish_date: job.publish_date,
                client_name: job.client_name,
                location: job.location,
                day_rate: job.day_rate,
                applicants: job.applicants,
                timerEnd: job.timerEnd,
                job_time_left: jobTimeLeft,
                status: jobTimeLeft > 0 ? 'Active' : 'Expired',
                ...processedApplicantInfo // Include the applicant info only if the user ID matches
            };
        });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            status: true,
            data: jobsWithProcessedData,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / limit)
            }
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Get a job by ID
export const getJobById = async (req: any, res: Response) => {
    try {
        const userId = req.user._id;
        const jobId = req.params.id;

        // Find the job by job_id
        const job: any = await Job.findOne({ job_id: jobId }).lean();
        if (!job) return res.status(404).json({ message: "Job not found" });

        const now = new Date();
        const jobTimeLeft = Math.max(new Date(job.timerEnd).getTime() - now.getTime(), 0);

        // Perform a lookup for applicants' information from the JobApplication collection
        const applicantsInfo = await Application.find({ _id: { $in: job.applicants } });

        // Filter for the matching applicant based on the user ID
        const matchingApplicant = applicantsInfo.find((applicant: any) => applicant.user_id.toString() === userId.toString());

        let processedApplicantInfo = {};
        if (matchingApplicant) {
            const cvTimeLeft = Math.max(new Date(matchingApplicant.timer).getTime() - now.getTime(), 0);

            processedApplicantInfo = {
                status: matchingApplicant.status,
                no_of_resouces: matchingApplicant.no_of_resouces,
                cv: matchingApplicant.cv,
                cv_timer_end: matchingApplicant.timer,
                cv_time_left: cvTimeLeft
            };
        }

        const jobWithTimeLeft = {
            ...job,
            job_time_left: jobTimeLeft,
            status: jobTimeLeft > 0 ? 'Active' : 'Expired',
            ...processedApplicantInfo
        };

        return res.status(200).json({
            message: "Job retrieved successfully",
            status: true,
            data: jobWithTimeLeft
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};


// Update a job
export const updateJob = async (req: Request, res: Response) => {
    try {
        const job = await Job.findOneAndUpdate({ job_id: req.params.id }, req.body, { new: true });
        if (!job) return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({
            message: "Job updated successfully",
            status: true,
            data: job
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

// Delete a job
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const job = await Job.findOneAndDelete({ job_id: req.params.id });
        if (!job) return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({
            message: "Job deleted successfully",
            status: true,
            data: null
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null
        });
    }
};

export const applicationJob = async (req: Request, res: Response) => {
    try {
        const { user_id, job_id, applied = false, resources = 0 } = req.body;

        // Check if the user and job exist
        const user = await ACRUserModel.findById(user_id);
        const job = await Job.findOne({ job_id });

        const appliedUser = await Application.findOne({ user_id, job_id });
        if (appliedUser) {
            return res.status(400).json({
                message: 'Application already submitted',
                status: false,
                data: null,
            });
        }

        if (!user || !job) {
            res.status(404).json({
                message: 'User or job not found',
                status: false,
                data: null,
            });
            return;
        }

        const application = await Application.create({
            user_id,
            job_id
        });
        if (applied) {
            application.status = 'Accepted'
            application.no_of_resouces = resources
            const now = new Date();
            application.timer = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        } else {
            application.status = 'Actioned'
        }

        const data = await application.save();
        job.applicants.push(data._id);
        await job.save();

        return res.status(200).json({
            message: 'Application submitted successfully',
            status: true,
            data: "application",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
}

export const applicationJobUpdate = async (req: Request, res: Response) => {
    try {
        const { user_id, job_id, cv } = req.body;
        const application: any = await Application.findOne({ user_id, job_id });

        if (application.status === "Not Submitted") {
            return res.status(400).json({
                message: 'Application is Expired',
                status: false,
                data: null,
            });
        }

        if (!application) {
            res.status(404).json({
                message: 'Application not found',
                status: false,
                data: null,
            });
            return;
        }

        application.status = "Under Review";
        application.cv = cv;
        await application.save();

        return res.status(200).json({
            message: 'Application status updated successfully',
            status: true,
            data: application,
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
}
