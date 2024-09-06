import e, { Request, response, Response } from "express"
import userModel from "../Models/userModel"
import referAndEarnModel from '../Models/referModel'
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"
import { deleteFromBackblazeB2, uploadMultipleFilesBackblazeB2, uploadToBackblazeB2 } from "../Util/aws"
import ACRUserModel from "../Models/ACRUserModel"
import mongoose from "mongoose"
import { acrPasswordGeneratedMail, forgotEmailSend, inviteLoginEmailSend, referViaCodeEmailSend, responseEmailSend } from "../Util/nodemailer"
import jwt from 'jsonwebtoken';
import adminModel from "../Models/adminModel"
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

export const createACRUser = async (req: Request, res: Response) => {
    try {
        const { personEmail } = req.body
        const user = await ACRUserModel.findOne({ personEmail })

        if (user) {
            return res.status(400).json({
                message: "ACR User already exists",
                status: false,
                data: null
            })
        }

        const password = "S1@3&*Jh"
        const newUser = await ACRUserModel.create({ ...req.body, password })
        const token = generateToken({ _id: newUser._id, email: newUser.personEmail, name: newUser.personName })

        acrPasswordGeneratedMail(newUser.personEmail, { name: newUser.personName });

        return res.status(200).json({
            message: "ACR User registration success",
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
        const users = await ACRUserModel.find();

        return res.status(200).json({
            message: "ACR Users fetch successfully",
            status: true,
            data: users
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
        const user: any = await userModel.findOne({ email: email.toLowerCase() });
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
        const user = await userModel.findOne({ email: decodedToken.email });

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