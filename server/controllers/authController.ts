import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middlewares/authMiddleware.js"

const generateToken = (id: string) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET || "fallback_secret",
        {expiresIn: '1d'}
    )
}

/**
 * @name registerUser
 * @description Register a new user expecting username, email and password in the request body
 * @access Public
 * @route Post /api/auth/register
 */
export const registerUser = async (req: Request, res: Response) : Promise<void> => {
    try {

        const {name, email, password } = req.body

        if (!name || !email || !password) {
                res.status(400).json({ 
                message: 'Username, email and password are required' 
            })
            return;
        }

        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400).json({
                message : "User already exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.HASH_ITERATIONS!)
        )

        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        if(user) {

            const token = generateToken(user._id.toString());

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });


            res.status(201).json({
                _id: user._id, 
                name: user.name,
                email: user.email,
            })
        }
        else {
            res.status(400).json({
                message : "Invalid user Data"
            })
        }

    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

/**
 * @name loginUser
 * @description Login a user expecting email and password in the request body
 * @access Public
 * @route Post /api/auth/login
 */
export const loginUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
                res.status(400).json({ 
                message: 'Email and password are required' 
            })
            return;
        }

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {

            const token = generateToken(user._id.toString())

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({
                _id: user._id, 
                name: user.name,
                email: user.email,
            })
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }      
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"})
    }
}

/**
 * @name logoutUser
 * @description Clears the auth cookie
 * @access Public
 * @route Post /api/auth/logout
 */
export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

/**
 * @name getMe
 * @description Returns the currently authenticated user, verified against the auth cookie
 * @access Private
 * @route Get /api/auth/me
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}