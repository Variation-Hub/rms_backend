import { Request, Response } from "express"
import CardModel from "../Models/CardModel"
import { uploadToBackblazeB2 } from "../Util/aws"
import { emailHelper } from "../Util/nodemailer";

export const createCard = async (req: any, res: Response) => {
    try {
        let file = {};
        if (req.file) {
            file = await uploadToBackblazeB2(req.file, "card")
        }
        const card = await CardModel.create({ ...req.body, file })
        emailHelper("abhishek@weetgateithub.com", card, req.user)

        return res.status(200).json({
            message: "card create success",
            status: true,
            data: card
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            data: null
        });
    }
}
