import { Request, Response } from "express"
import userDBAcessModel from "../Models/databaseModelLogin"
import { generateToken } from "../Util/JwtAuth"
import { comparepassword } from "../Util/bcrypt"

export const registerUserDBUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await userDBAcessModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User already exists",
                status: false,
                data: null
            })
        }
        const newUser = await userDBAcessModel.create(req.body)
        const token = generateToken({ _id: newUser._id, email: newUser.email, name: newUser.name, accessDB: true })
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

export const loginUserDBUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await userDBAcessModel.findOne({ email: email.toLowerCase() })

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

        const token = generateToken({ _id: user._id, email: user.email, name: user.name, accessDB: true })
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
