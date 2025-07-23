import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";

const secret = process.env.SECRET_KEY as string;

export const authorizeRolesWithoutErrorDB = (req: any, res: Response, next: NextFunction) => {
    const BearerToken: string | undefined = req.header('authorization');
    if (BearerToken) {
        const token = BearerToken.slice(7);
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                    status: false
                });
            }

            if (decoded.accessDB) {
                req.user = decoded;
                next();
            } else {
                return res.status(401).json({
                    message: "Unauthorized",
                    status: false
                });
            }

        });
    } else {
        return res.status(401).json({
            message: "Unauthorized",
            status: false
        });
    }
};
