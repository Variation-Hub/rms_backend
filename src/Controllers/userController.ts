import { Request, Response } from "express"
import userModel from "../Models/userModel"
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"

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

        const newUser = await userModel.create(req.body)
        console.log(newUser)
        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name, userName: newUser.name })
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

        const token = generateToken({ _id: user._id, email: user.email, name: user.name, userName: user.name })
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
