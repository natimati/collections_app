import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from '../dataLayer/user'

const tokenJwtSecret = process.env.ACCESS_TOKEN_SECRET as string;

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = (req.headers.authorization || "")
        .replace("Bearer ", "");

    try {
        if (!token) {
            throw new Error("Token not available")
        }

        const decoded = jwt.decode(token) as { id: string };

        if (!decoded || !decoded.id) {
            throw new Error("Token not available")
        }

        const user = await userModel.findOne({
            where: { id: decoded.id }
        });

        if (!user) {
            throw new Error("User not found")
        }

    } catch (e) {
        return res
            .status(401)
            .json({ message: (e as Error).message })
    }

    return jwt.verify(token, tokenJwtSecret, (e) => {
        if (e) {
            return res.status(401).json({ message: "Token is not valid" })
        }
        next();
        return null
    });
};

export default authMiddleware;
