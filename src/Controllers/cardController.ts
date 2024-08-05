import { Request, Response } from "express"
import CardModel from "../Models/CardModel"
import { uploadToBackblazeB2 } from "../Util/aws"
import { emailHelper } from "../Util/nodemailer";

export const createCard = async (req: any, res: Response) => {
    try {
        // let file = {};
        // if (req.file) {
        //     file = await uploadToBackblazeB2(req.file, "card")
        // }
        req.body.forEach(async (value: any) => {
            const card = await CardModel.create(value)
            emailHelper("abhishek@weetgateithub.com", card, req.user)
        })

        return res.status(200).json({
            message: "card create success",
            status: true,
            data: "Multiple card created successfully"
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}
