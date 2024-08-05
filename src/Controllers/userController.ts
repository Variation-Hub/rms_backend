import { Request, Response } from "express"
import userModel from "../Models/userModel"
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"
import { deleteFromBackblazeB2, uploadMultipleFilesBackblazeB2, uploadToBackblazeB2 } from "../Util/aws"
import ACRUserModel from "../Models/ACRUserModel"

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
        let profilePicture = {}
        if (req.file) {
            profilePicture = await uploadToBackblazeB2(req.file, "profilePicture")
        }
        const newUser = await userModel.create({ ...req.body, profilePicture })
        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name, userName: newUser.userName })
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

        const token = generateToken({ _id: user._id, email: user.email, name: user.name, userName: user.userName })
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
        const { password, email, ...updateData } = req.body;

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