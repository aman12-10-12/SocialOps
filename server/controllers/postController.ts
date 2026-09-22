import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from '@google/genai';
import { cloudinary } from "../config/cloudinary.js";
import { Generation } from "../models/Generation.js";
import { Post } from "../models/Posts.js";


/**
 * @name generatePost
 * @description Generate Post
 * @access Private
 * @route POST /api/posts/generate
 */
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body
        const apiKey = process.env.GEMINI_API_KEY

        if(!apiKey) {
            res.status(400).json({
                message : "Gemini API key is missing. Please add it to server/.env file."
            })
            return;
        }

        // Validate prompt
        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            res.status(400).json({
                message: "Prompt is required.",
            });
            return;
        }


        // cretaing Gemini Instance 
        const ai = new GoogleGenAI({apiKey});

        // Generate social Media content
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: `
                Generate a social media post based on this prompt:

                "${prompt}"

                Tone: ${tone || "professional"}

                Include relevant hashtags.

                Return JSON with exactly these fields:

                {
                    "content": "The social media post including relevant hashtags",
                    "imagePrompt": "A highly descriptive prompt for an image generator that visually complements the social media post"
                }

                Do not include markdown.
                Do not include code fences.
                Return only valid JSON.
            `,

            config: {
                responseMimeType: "application/json",
            },
        });

        let content = "";
        let imagePrompt = prompt;

        try {
            const rawText = textResponse.text || "";
            const jsonMatch = rawText.match(/\{[\s\s]*\}/)
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {content: rawText, imagePrompt: prompt}
            content = data.content;
            imagePrompt = data.imagePrompt
        } catch (e) {
            content = textResponse.text || ""
        }

        let mediaUrl = ""
        if(generateImage) {
            try {
                const imageResponse = await ai.models.generateContent({
                    model: "gemini-3.1-flash-image",
                    contents: imagePrompt,
                    config: {
                        responseModalities: ["Image"],
                    },
                });

                const parts = imageResponse.candidates?.[0]?.content?.parts || [];
                const imagePart = parts.find((part) => part.inlineData);

                if (imagePart?.inlineData?.data) {
                    const mimeType = imagePart.inlineData.mimeType || "image/png";
                    const base64Image = `data:${mimeType};base64,${imagePart.inlineData.data}`;

                    // Upload to Cloudinary for oersistence ( data URI upload works directly, no need to write a temp file)
                    const uploadResult = await cloudinary.uploader.upload(base64Image, {
                        folder: "ai-generated-posts",
                        resource_type: "image",
                    });

                    mediaUrl = uploadResult.secure_url;
                } 
            } catch (err : any) {
                console.error("Image generation failed:", err);
            }
        }

        const generation = await Generation.create({
            user: req.user?.id,
            prompt,
            tone: tone || "professional",
            content,
            mediaUrl,
            mediaType: mediaUrl ? "image" : undefined,
        });

        res.status(200).json({
            generation,
        });
    }
    catch (error: any){
        // console.error("generatePost error:", error);
        res.status(500).json({ message: error?.message || "Failed to generate post." });
    }
}


/**
 * @name getGeneration
 * @description Get generated content
 * @access Private
 * @route GET /api/posts/generations
 */
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const generations = await Generation.find({ user: req.user?.id })
            .sort({ createdAt: -1 });

        res.status(200).json(generations);
    } catch (error : any) {
        res.status(500).json({ message: error?.message || "Failed to generate post." });
    }
}


/**
 * @name getPosts
 * @description Get posts
 * @access Private
 * @route GET /api/posts/
 */
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({user: req.user._id})
        res.json(posts)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}


/**
 * @name schedulePost
 * @description schedule posts
 * @access Private
 * @route POST /api/posts/
 */
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {content, platforms, scheduledFor, status } = req.body;

        // Parse platforms it it comes as a strigified array from formData
        let parsedPlatforms = platforms;
        if(typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms)
            } catch (e) {
                parsedPlatforms = platforms.split(",")
            }
        }

        let mediaUrl: string | undefined = req.body.mediaUrl;
        let mediaType: "image" | "video" | undefined = req.body.mediaType

        if(req.file) {
            const result = await new Promise<any>((resolve, reject)=> {
                const stream = cloudinary.uploader.upload_stream({
                    resource_type: "auto",
                    folder: "SocialOps"
                }, (error, result) => {
                    if(error) {
                        reject(error)
                    }
                    else {
                        resolve(result)
                    }
                });
                stream.end(req.file!.buffer)
            });
            mediaUrl = result.secure_url;
            mediaType = result.resource_type === "video" ? "video" : "image"
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms,
            mediaUrl,
            mediaType,
            scheduledFor,
            status
        })

        res.status(201).json(post)

    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server Error" });
    }
}
