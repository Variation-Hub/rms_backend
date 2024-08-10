import { Request, response, Response } from "express"
import userModel from "../Models/userModel"
import referAndEarnModel from '../Models/referModel'
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"
import { deleteFromBackblazeB2, uploadMultipleFilesBackblazeB2, uploadToBackblazeB2 } from "../Util/aws"
import ACRUserModel from "../Models/ACRUserModel"
import mongoose from "mongoose"
import { forgotEmailSend, inviteLoginEmailSend, referViaCodeEmailSend } from "../Util/nodemailer"
import jwt from 'jsonwebtoken';


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

        let referredBy = await referAndEarnModel.findOne();
        if (!referredBy) {
            referredBy = await referAndEarnModel.create({ code: 0 });
        }

        let lookingFor = [];
        if (req.body.lookingFor) {
            lookingFor = req.body.lookingFor.split(',')
        }
        const newUser = await userModel.create({ ...req.body, lookingFor, referredBy: referredBy.code })
        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name, referredBy: referredBy.code })

        referredBy.code += 1;
        await referredBy.save();

        const loginLink = `https://rms.whyqtech.com/#/cir/cir-login`
        await inviteLoginEmailSend({ candidateName: req.body.name, email: newUser.email, link: loginLink });

        return res.status(200).json({
            message: "User registartion success",
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

        const token = generateToken({ _id: user._id, email: user.email, name: user.name, referredBy: user.referredBy })
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

        console.log(id, req.body);
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

        const newUser = await ACRUserModel.create(req.body)
        const token = generateToken({ _id: newUser._id, email: newUser.personEmail, name: newUser.personName, userName: newUser.userName })
        return res.status(200).json({
            message: "ACR User registartion success",
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

        const token = generateToken({ _id: user._id, email: user.personEmail, name: user.personName, userName: user.userName })
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

        const resetLink = `https://rms.whyqtech.com/#/cir/cir-reset-password?token=${token}`;

        const response = await forgotEmailSend({ email: user.email, link: resetLink });

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
        const refercode = req.user.referredBy
        const { name, email } = req.body;
        const referLink = `https://rms.whyqtech.com/#/cir/cir-register?code=${refercode}`;

        const user = await userModel.findOne({ referredBy: refercode });
        if (!user) {
            return res.status(404).json({
                message: "Referral code not found",
                status: false,
                data: null
            });
        }

        const response = await referViaCodeEmailSend({ newCandidateName: name, name: user.name, email, link: referLink, referralCode: refercode })
        if (response) {
            return res.status(200).json({
                message: "Referal link sent to your email",
                status: true,
                data: null
            });
        } else {
            return res.status(500).json({
                message: "Failed to send referal link",
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
