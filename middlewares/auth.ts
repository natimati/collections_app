import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from '../dataLayer/user'

const tokenJwtSecret = process.env.ACCESS_TOKEN_SECRET as string;

const authMiddlewere = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const token = (req.headers.authorization || "")
        .replace("Bearer ", "");
    try {
        const decoded = jwt.decode(token) as { id: string };
        if (decoded.id) {
            await userModel.findOne({
                where: { id: decoded.id }, rejectOnEmpty: true
            });
        }

    } catch (e) {
        return res
            .status(401)
            .json({ message: "It's not authorized, token not available" })
    }

    if (token) {
        jwt.verify(token, tokenJwtSecret, (e) => {
            if (e) {
                return res.status(401).json({ message: "It's not authorized" })
            }
            next();
            return null
        });
    } else {
        return res
            .status(401)
            .json({ message: "It's not authorized, token not available" })
    }
    return null;
};

export default authMiddlewere;
