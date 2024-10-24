import e, { Request, response, Response } from "express"
import userModel from "../Models/userModel"
import referAndEarnModel from '../Models/referModel'
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"
import { deleteFromBackblazeB2, uploadMultipleFilesBackblazeB2, uploadToBackblazeB2 } from "../Util/aws"
import ACRUserModel from "../Models/ACRUserModel"
import mongoose from "mongoose"
import { acrPasswordGeneratedMail, adminMail, adminMailWithPassword, forgotEmailSend, inviteLoginEmailSend, referViaCodeEmailSend, responseEmailSend } from "../Util/nodemailer"
import jwt from 'jsonwebtoken';
import adminModel from "../Models/adminModel"
import CandidateJobApplication from '../Models/candicateJobApplication'
import { generatePassword } from "../Util/passwordGenarator"
import JobModel from "../Models/JobModel"
const { Parser } = require('json2csv');

const url = 'https://rms.saivensolutions.co.uk';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User already exists",
                status: false,
                data: null
            })
        }

        let referredCode = await referAndEarnModel.findOne();
        if (!referredCode) {
            referredCode = await referAndEarnModel.create({ code: 11 });
        }

        let lookingFor = [];
        if (req.body.lookingFor) {
            lookingFor = req.body.lookingFor.split(',')
        }
        const newUser = await userModel.create({ ...req.body, lookingFor, referredCode: referredCode.code })
        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name, referredCode: referredCode.code, referredBy: newUser.referredBy })

        referredCode.code += 1;
        await referredCode.save();

        const loginLink = `${url}/#/cir/cir-login`
        await inviteLoginEmailSend({ candidateName: req.body.name, email: newUser.email, link: loginLink });
        await responseEmailSend({ name: req.body.name, email: newUser.email })

        return res.status(200).json({
            message: "User registration success",
            status: true,
            data: { token, user: newUser }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.status(404).json({
                message: "user not found",
                status: false,
                data: null
            })
        }

        if (!(await comparepassword(password, user.password))) {
            return res.status(400).json({
                message: "please enter valid password",
                status: false,
                data: null
            })
        }

        const token = generateToken({ _id: user._id, email: user.email, name: user.name, referredBy: user.referredBy, referredCode: user.referredCode })
        return res.status(200).json({
            message: "User login success",
            status: true,
            data: { token, user }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({
            message: "User updated successfully",
            status: true,
            data: updatedUser
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: "User fetch successfully",
            status: true,
            data: user
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const uploadFile = async (req: any, res: Response) => {
    try {
        let file
        if (req.files?.length === 1) {
            file = await uploadToBackblazeB2(req.files[0], "files")
        } else if (req.files?.length > 1) {
            file = await uploadMultipleFilesBackblazeB2(req.files, "files")
        }

        return res.status(200).json({
            message: "file uploaded successfully",
            status: true,
            data: file
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const deleteFiles = async (req: Request, res: Response) => {
    try {

        let { files } = req.body

        files.forEach(async (file: { key: string }) => {
            await deleteFromBackblazeB2(file)
        });
        // files = await deleteMultipleFromS3(files.map((file: { key: string }) => file.key))
        return res.status(200).json({
            message: "file deleted successfully",
            status: true,
            // data: files
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

// JOB APPLICATION
export const applyJobRole = async (req: any, res: Response) => {
    try {
        const user_id = req.user?._id;
        const { job_id } = req.params
        const { cv } = req.body

        const applied = await CandidateJobApplication.findOne({
            job_id,
            user_id
        })

        if (applied) {
            return res.status(400).json({
                message: "You have already applied for this job",
                status: false,
                data: null
            });
        }

        const job = await JobModel.findOne({ job_id });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false,
                data: null
            });
        }

        const user = await userModel.findById(user_id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        if (cv) {
            user.cv = cv;
            await user.save();
        }


        const jobApplication = await CandidateJobApplication.create({
            user_id,
            job_id,
            cvDetails: user.cv
        });

        console.log(job?.job_id, user?._id, jobApplication?._id)

        job.candicateApplication.push(jobApplication?._id);

        await job.save();

        return res.json({
            message: "Applied for the job successfully",
            status: true,
            data: jobApplication
        });

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const fetchJobs = async (req: any, res: Response) => {
    try {
        const { page, limit, skip } = req.pagination!;
        const { keyword } = req.query
        const user_id = req.user?._id;

        let query: any = { status: 'Active' }
        if (keyword) {
            query.job_title = { $regex: keyword, $options: 'i' };
        }

        let totalCount = await JobModel.find(query).countDocuments();

        const jobs = await JobModel.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "candidatejobapplications",
                    localField: "candicateApplication",
                    foreignField: "_id",
                    as: "candidateApplications"
                },
            }
        ]).skip(skip).limit(limit);

        let jobsWithProcessedData = jobs.map((job: any) => {

            const matchingApplicant = job.candidateApplications.find((applicant: any) => applicant.user_id.toString() === user_id.toString());

            if (matchingApplicant) {
                job.status = "Applied"
            }

            return {
                _id: job._id,
                job_id: job.job_id,
                job_title: job.job_title,
                no_of_roles: job.no_of_roles,
                publish_date: job.publish_date,
                upload: job.upload,
                status: job.status,
                // candidateDetails: matchingApplicant
            };
        });

        return res.json({
            message: "Fetched jobs successfully",
            status: true,
            data: jobsWithProcessedData,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / limit)
            }
        });

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}



// ACR
export const createACRUser = async (req: Request, res: Response) => {
    try {
        const { personEmail } = req.body
        const user: any = await ACRUserModel.findOne({ personEmail })

        if (user) {
            for (let key in req.body) {
                user[key] = req.body[key];
            }
            await user.save();
            const token = generateToken({ _id: user._id, email: user.personEmail, name: user.personName })
            return res.status(200).json({
                message: "ACR User update success",
                status: true,
                data: { token, user: user }
            });
            // return res.status(400).json({
            //     message: "ACR User already exists",
            //     status: false,
            //     data: null
            // })
        } else {

            const password = generatePassword();
            const newUser = await ACRUserModel.create({ ...req.body, password })
            const token = generateToken({ _id: newUser._id, email: newUser.personEmail, name: newUser.personName })
            adminMailWithPassword(process.env.EMAIL_PASSWORD!, { agencyName: newUser?.agencyName, name: newUser.personName, email: newUser.personEmail, phone: newUser?.phoneNumber, password })
            return res.status(200).json({
                message: "ACR User registration success",
                status: true,
                data: { token, user: newUser }
            });
        }

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const loginACRUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await ACRUserModel.findOne({ personEmail: email.toLowerCase() })

        if (!user) {
            return res.status(404).json({
                message: "ACR User not found",
                status: false,
                data: null
            })
        }

        if (!(await comparepassword(password, user.password))) {
            return res.status(400).json({
                message: "please enter valid password",
                status: false,
                data: null
            })
        }

        const token = generateToken({ _id: user._id, email: user.personEmail, name: user.personName })
        return res.status(200).json({
            message: "ACR User login success",
            status: true,
            data: { token, user }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const getACRUsers = async (req: Request, res: Response) => {
    try {

        const { page, limit, skip } = req.pagination!;

        const totalCount = await ACRUserModel.countDocuments();

        const users = await ACRUserModel.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "ACR Users fetch successfully",
            status: true,
            data: users,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / (limit as number))
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const forgotUserPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user: any = await ACRUserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        const token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.SECRET_KEY as string,
            { expiresIn: '10m' } // Token expires in 10 minutes
        );

        const resetLink = `${url}/#/cir/cir-reset-password?token=${token}`;

        const response = await forgotEmailSend({ newCandidateName: user.name, email: user.email, link: resetLink });

        if (response) {
            return res.status(200).json({
                message: "Password reset link sent to your email",
                status: true,
                data: null
            });
        } else {
            return res.status(500).json({
                message: "Failed to send password reset link",
                status: false,
                data: null
            });
        }

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Token is required",
                status: false,
                data: null
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as any;
        const user = await ACRUserModel.findOne({ email: decodedToken.email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        user.password = password;
        await user.save();

        return res.status(200).json({
            message: "Password has been reset successfully",
            status: true,
            data: null
        });

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                message: "Token has expired",
                status: false,
                data: null
            });
        }

        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const referUser = async (req: any, res: Response) => {
    try {
        const refercode = req.user.referredCode
        const data = req.body;
        const referLink = `${url}/#/cir/cir-register?code=${refercode}`;

        const user = await userModel.findOne({ referredCode: refercode });
        if (!user) {
            return res.status(404).json({
                message: "Referral code not found",
                status: false,
                data: null
            });
        }
        const sendEmails = data.map(async (item: any) => {
            return await referViaCodeEmailSend({
                newCandidateName: item.name,
                name: user.name,
                currentWork: item.job_title,
                email: item.email,
                link: referLink,
                referralCode: refercode
            });
        });

        Promise.all(sendEmails)
            .then(() => {
                return res.status(200).json({
                    message: "Referral link sent to your email",
                    status: true,
                    data: null
                });
            })
            .catch(() => {
                return res.status(500).json({
                    message: "Failed to send referral link",
                    status: false,
                    data: null
                });
            });


    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const getModelData = async (req: Request, res: Response) => {
    try {
        const { modelName } = req.query;
        const filter = req.query
        delete filter.modelName;
        delete filter.page;
        delete filter.limit;

        if (!modelName || typeof modelName !== 'string') {
            return res.status(400).json({
                message: "Invalid or missing modelName in query",
                status: false,
                data: null
            });
        }

        const Model = mongoose.model(modelName);

        if (!Model) {
            return res.status(404).json({
                message: "Model not found",
                status: false,
                data: null
            });
        }

        const { page, limit, skip } = req.pagination!;

        const data = await Model.find(filter)
            .skip(skip)
            .limit(limit);

        const totalCount = await Model.countDocuments();

        return res.status(200).json({
            message: "Data fetched successfully",
            status: true,
            data,
            meta_data: {
                page,
                items: totalCount,
                page_size: limit,
                pages: Math.ceil(totalCount / (limit as number))
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
};

export const downloadCsv = async (req: Request, res: Response) => {
    try {
        const { modelName } = req.query;

        if (!modelName || typeof modelName !== 'string') {
            return res.status(400).json({
                message: "Invalid or missing modelName in query",
                status: false,
                data: null
            });
        }

        const Model = mongoose.model(modelName);

        if (!Model) {
            return res.status(404).json({
                message: "Model not found",
                status: false,
                data: null
            });
        }


        const data = await Model.find().lean()

        if (data.length === 0) {
            return res.status(404).json({
                message: "No data found",
                status: false,
                data: null
            });
        }

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);

        // Set response headers for file download
        res.header('Content-Type', 'text/csv');
        res.attachment(`${modelName}data.csv`);
        return res.send(csv);
    } catch (error) {
        console.error('Error generating CSV:', error);
        return res.status(500).send('Server Error');
    }
};

export const resetacrPassword = async (req: any, res: Response) => {

    try {
        const { password } = req.body;
        const { email } = req.user

        const user = await ACRUserModel.findOne({ personEmail: email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        user.password = password;
        user.password_reset = true;
        await user.save();

        return res.status(200).json({
            message: "Password has been reset successfully",
            status: true,
            data: null
        });

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                message: "Token has expired",
                status: false,
                data: null
            });
        }

        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const updateACRUser = async (req: any, res: Response) => {
    try {
        const user_id = req.user;

        const { appliedRole, profile } = req.body;

        const user = await ACRUserModel.findById(user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            });
        }

        user.appliedRole = appliedRole || user?.appliedRole;
        user.profile = profile || user?.profile;
        await user.save();

        acrPasswordGeneratedMail(user.personEmail, { name: user.personName, ccEmail: user.secondaryEmail });

        process.env.EMAIL_ARRAY?.split(" ")?.forEach((item: string) => {
            adminMail(item, { agencyName: user?.agencyName, name: user.personName, email: user.personEmail, phone: user?.phoneNumber })
        })

        return res.status(200).json({
            message: "User updated successfully",
            status: true,
            data: null
        });

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await adminModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "Admin already exists",
                status: false,
                data: null
            })
        }

        const newUser = await adminModel.create(req.body)
        const token = generateToken({ _id: newUser._id, email: newUser.email })

        return res.status(200).json({
            message: "Admin registration success",
            status: true,
            data: { token, user: newUser }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await adminModel.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.status(404).json({
                message: "user not found",
                status: false,
                data: null
            })
        }

        if (!(await comparepassword(password, user.password))) {
            return res.status(400).json({
                message: "please enter valid password",
                status: false,
                data: null
            })
        }

        const token = generateToken({ _id: user._id, email: user.email })
        return res.status(200).json({
            message: "Admin login success",
            status: true,
            data: { token, user }
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}

export const forgotACRUserPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user: any = await ACRUserModel.findOne({ personEmail: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "ACR User not found",
                status: false,
                data: null
            });
        }

        const token = jwt.sign(
            { email: user.personEmail, name: user.agencyName },
            process.env.SECRET_KEY as string,
            { expiresIn: '10m' }
        );

        const resetLink = `${url}/#/acr/acr-reset-password?token=${token}`;

        const response = await forgotEmailSend({ newCandidateName: user.agencyName, email: user.personEmail, link: resetLink });

        if (response) {
            return res.status(200).json({
                message: "Password reset link sent to your email",
                status: true,
                data: null
            });
        } else {
            return res.status(500).json({
                message: "Failed to send password reset link",
                status: false,
                data: null
            });
        }

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}