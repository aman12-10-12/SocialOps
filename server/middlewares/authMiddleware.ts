import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
    userId?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
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

        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: "Not authorized, token invalid" });
    }
};