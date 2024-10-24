import { Request, Response } from 'express';
import Job from '../Models/JobModel';
import Application from '../Models/applicationModel';
import Counter from '../Models/JobCounter'
import ACRUserModel from '../Models/ACRUserModel';
import { activeRolesPostedMail, cvRecivedMail, cvReviewMail, InActiveRolesPostedMail, newJobAlertMail, uploadCVAlertMail } from '../Util/nodemailer';

const emailSend = process.env.JOB_MAIL!;

export const fetchJobId = async (req: Request, res: Response) => {
    try {
        const counter: any = await Counter.findOne();
        const job_id = `JD${String(counter?.seq + 1).padStart(3, '0')}`;
        return res.status(200).json({
            message: "JobID Fetched",
            status: true,
            data: {
                job_id
            }
        })
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}
// Create a new job
export const createJob = async (req: Request, res: Response) => {
    try {
        const status = req?.body?.status;

        if (status === 'Active') {
            await Counter.findOneAndUpdate(
                {},
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
        }

        const newJob = await Job.create({ ...req.body });

        const allAgengies: any = await ACRUserModel.find();

        if (status === 'Active') {
            function delay(ms: number) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            allAgengies?.forEach(async (agent: any, index: number) => {
                if (agent?.personEmail) {
                    await delay(index * 1000); // Adding 1-second delay per email
                    const success = await activeRolesPostedMail(agent?.personEmail, { name: agent?.agencyName });
                    if (!success) {
                        console.log(`Failed to send email to ${agent?.personEmail}`);
                    }
                }
            });

            process.env.EMAIL_ARRAY_JOB?.split(" ")?.forEach(async (email, index) => {
                await delay(index * 1000); // Adding 1-second delay per email
                const success = await newJobAlertMail(email, {
                    jobTitle: req.body?.job_title,
                    numOfRoles: req.body?.no_of_roles,
                    publishedDate: req.body?.publish_date,
                    dayRate: req.body?.day_rate,
                    filename: newJob?.upload?.key || "",
                    url: newJob?.upload?.url || ""
                })
                if (!success) {
                    console.log(`Failed to send email to ${email}`);
                }
            });

        } else {
            await InActiveRolesPostedMail(process.env.EMAIL_INACTIVE!, {
                jobTitle: req?.body?.job_title || "",
                start_date: req?.body?.start_date || "",
                client_name: req?.body?.client_name || ""
            })
        }
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
        const { keyword, status } = req.query
        const userId = req.user._id;

        let query: any = {}
        if (keyword) {
            query.job_title = { $regex: keyword, $options: 'i' };
        }

        let totalCount = await Job.find(query).countDocuments();

        const data = await Job.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'jobapplications', // The JobApplication collection
                    localField: 'applicants', // Job applicants' IDs
                    foreignField: '_id', // The field in JobApplication that corresponds to those IDs
                    as: 'applicantsInfo' // Store the looked-up documents
                }
            },
            {
                $addFields: {
                    sortStatus: {
                        $cond: {
                            if: { $eq: ["$status", "Active"] },
                            then: 0,
                            else: 1
                        }
                    },
                    sortInactiveStatus: {
                        $cond: {
                            if: { $eq: ["$status", "Inactive"] },
                            then: 0,
                            else: 1
                        }
                    }
                },
            },
            {
                $sort: {
                    sortStatus: 1, // Active (0) first, then Inactive (1)
                    sortInactiveStatus: -1,
                    createAt: -1 // Latest first
                }
            },
            {
                $project: {
                    sortStatus: 0 // Optionally remove the sortStatus field
                }
            }
        ]).skip(skip).limit(limit);

        // Process the aggregated results
        let jobsWithProcessedData = data.map((job: any) => {
            const now = new Date();
            const jobTimeLeft = Math.max(new Date(job.timerEnd).getTime() - now.getTime(), 0);

            // Filter applicants to check if the user ID matches
            const matchingApplicant = job.applicantsInfo.find((applicant: any) => applicant.user_id.toString() === userId.toString());

            let processedApplicantInfo: any = {};
            if (matchingApplicant) {
                const cvTimeLeft = Math.max(new Date(matchingApplicant.timer).getTime() - now.getTime(), 0);

                processedApplicantInfo = {
                    status: matchingApplicant.status,
                    no_of_resouces: matchingApplicant.no_of_resouces,
                    cvDetails: matchingApplicant.cvDetails,
                    cv_timer_end: matchingApplicant.timer,
                    applied: matchingApplicant.applied,
                    cv_time_left: matchingApplicant.status === "Under Review" ? 0 : cvTimeLeft
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
                upload: job.upload,
                timerEnd: job.timerEnd,
                job_time_left: job.status === "Inactive" || (processedApplicantInfo?.status === "Actioned" || processedApplicantInfo?.status === "Under Review") ? 0 : processedApplicantInfo?.cv_time_left || jobTimeLeft,
                status: job.status === "Inactive" ? "Inactive" : jobTimeLeft > 0 ? 'Active' : 'Expired',
                ...processedApplicantInfo // Include the applicant info only if the user ID matches
            };
        });

        if (status) {
            jobsWithProcessedData = jobsWithProcessedData.filter(item => item.status === status)
            totalCount = jobsWithProcessedData.length;
        }

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

        const job: any = await Job.aggregate([
            {
                $match: {
                    job_id: jobId
                }
            },
            {
                $lookup: {
                    from: 'jobapplications',
                    localField: 'applicants',
                    foreignField: '_id',
                    as: 'applicantsInfo'
                }
            },
            {
                $unwind: {
                    path: '$applicantsInfo'
                }
            },
            {
                $lookup: {
                    from: 'acrusers',
                    localField: 'applicantsInfo.user_id', // Match applicantsInfo user_id with clientInfo _id
                    foreignField: '_id',
                    as: 'applicantsInfo.clientInfo'
                }
            },
            {
                $unwind: {
                    path: '$applicantsInfo.clientInfo',
                    preserveNullAndEmptyArrays: true // Optional: if there are no matching clients, still keep applicantsInfo
                }
            },
            {
                $group: {
                    _id: '$_id', // Group back into one job document
                    job_id: { $first: '$job_id' },
                    job_title: { $first: '$job_title' },
                    no_of_roles: { $first: '$no_of_roles' },
                    start_date: { $first: '$start_date' },
                    publish_date: { $first: '$publish_date' },
                    client_name: { $first: '$client_name' },
                    location: { $first: '$location' },
                    day_rate: { $first: '$day_rate' },
                    status: { $first: '$status' },
                    upload: { $first: '$upload' },
                    timerEnd: { $first: '$timerEnd' },
                    applicantsInfo: { $push: '$applicantsInfo' } // Group all applicantsInfo with clientInfo embedded
                }
            }
        ]);



        if (!job) return res.status(404).json({ message: "Job not found" });

        const now = new Date();
        const jobTimeLeft = Math.max(new Date(job.timerEnd).getTime() - now.getTime(), 0);

        const applicantsInfo = await Application.find({ _id: { $in: job.applicants } });

        const matchingApplicant = applicantsInfo.find((applicant: any) => applicant.user_id.toString() === userId.toString());

        let processedApplicantInfo: any = {};
        if (matchingApplicant) {
            const cvTimeLeft = Math.max(new Date(matchingApplicant.timer).getTime() - now.getTime(), 0);

            processedApplicantInfo = {
                status: matchingApplicant.status,
                no_of_resouces: matchingApplicant.no_of_resouces,
                cvDetails: matchingApplicant.cvDetails,
                cv_timer_end: matchingApplicant.timer,
                cv_time_left: cvTimeLeft
            };
        }

        return res.status(200).json({
            message: "Job retrieved successfully",
            status: true,
            data: job
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
        if (!job) return res.status(404).json({
            message: "Job not found",
            status: false,
            data: null
        });
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
        const { user_id, job_id, applied = false, resources } = req.body;

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
            job_id,
            applied
        });
        if (applied) {
            application.status = 'Accepted'
            application.no_of_resouces = resources || application.no_of_resouces
            const now = new Date();
            application.timer = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        } else {
            application.status = 'Actioned'
        }

        const data = await application.save();
        job.applicants.push(data._id);
        await job.save();

        uploadCVAlertMail(user?.personEmail, {
            name: user?.agencyName,
            role: job?.job_title,
            day_rate: job?.day_rate,
            clientName: job?.client_name,
            position: resources,
            roleType: user?.location,
            filename: job?.upload?.key,
            url: job?.upload?.url
        })

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
        const { user_id, job_id, cvDetails } = req.body;
        const application: any = await Application.findOne({ user_id, job_id });
        const user: any = await ACRUserModel.findById(user_id);
        const job: any = await Job.findOne({ job_id });

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

        application.cvDetails = cvDetails;
        application.status = application?.no_of_resouces === application?.cvDetails.length ? "Under Review" : "Partially Uploaded";
        await application.save();

        if (application?.no_of_resouces === application?.cvDetails.length) {
            cvRecivedMail(user?.personEmail, {
                name: user?.agencyName,
                role: job?.job_title,
                clientName: job?.client_name,
                day_rate: job?.day_rate,
                position: application?.no_of_resouces,
                roleType: job?.location
            })

            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(today.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            cvReviewMail(emailSend, {
                title: job?.job_title,
                clientName: job?.client_name,
                cv_count: application?.cvDetails.length,
                uploadeBy: user?.agencyName,
                date: formattedDate,
                nationality: application?.cvDetails?.map((item: any) => item?.candidate_nationality)?.join(', '),
                location: application?.cvDetails?.map((item: any) => item?.candidate_location)?.join(', '),
                filename: job?.upload?.key,
                url: job?.upload?.url,
                cvUploaded: application?.cvDetails?.map((item: any) => item?.cv)
            })
        }

        return res.status(200).json({
            message: 'Application status updated successfully',
            status: true,
            data: application
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
}
