import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "fallback_secret"
        ) as { id: string };

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401).json({ message: "Not authorized, user not found" });
            return;
        }

        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: "Not authorized, token invalid" });
    }
};