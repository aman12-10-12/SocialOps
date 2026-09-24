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
            model: "gemini-3.5-flash-lite",

            contents: `
                Generate a social media post based on this idea:

                "${prompt}"

                Tone: ${tone || "professional"}

                Include relevant hashtags.

                Requirements:
                - Write only the actual social media post in the "content" field.
                - Include relevant hashtags at the end of the post.
                - Do NOT include JSON inside the content field.
                - Do NOT include labels such as "Content:".
                - Do NOT include markdown code fences.
                - Do NOT explain your answer.
                - Create a separate detailed visual description in "imagePrompt".
                - The imagePrompt must describe an image that visually represents the post.

                Return exactly this JSON structure:

                {
                "content": "actual social media post with hashtags",
                "imagePrompt": "detailed image generation prompt"
                }
            `,

            config: {
                responseMimeType: "application/json",
            },
        });

        let content = "";
        let imagePrompt = prompt;

        try {
            const rawText = textResponse.text?.trim() || "";

            const data = JSON.parse(rawText);

            content = data.content?.trim() || "";
            imagePrompt = data.imagePrompt?.trim() || prompt;

        } catch (error) {
            console.error("Failed to parse Gemini JSON:", error);
            console.error("Raw Gemini response:", textResponse.text);

            content = textResponse.text?.trim() || "";
        }

        let mediaUrl = ""
        if(generateImage) {
            try {
                console.log("Generating image...");
                console.log("Image prompt:", imagePrompt);
                const imageResponse = await ai.models.generateContent({
                    model: "gemini-3.1-flash-image",
                    contents: imagePrompt,
                    config: {
                        responseModalities: ["IMAGE"],
                    },
                });

                const parts = imageResponse.candidates?.[0]?.content?.parts || [];

                const imagePart = parts.find((part) => part.inlineData?.data);

                if (imagePart?.inlineData?.data) {
                    const mimeType = imagePart.inlineData.mimeType || "image/png";
                    const base64Image = `data:${mimeType};base64,${imagePart.inlineData.data}`;

                    // Upload to Cloudinary for oersistence ( data URI upload works directly, no need to write a temp file)
                    const uploadResult = await cloudinary.uploader.upload(base64Image, {
                        folder: "ai-generated-posts",
                        resource_type: "image",
                    });

                    mediaUrl = uploadResult.secure_url;
                }  else { 
                    throw new Error("Gemini did not return image data.");
                }
    
            } catch (err : any) {
                console.error("Image generation failed:", err);
                const isQuotaError = err?.status === 429
                    || err?.code === 429
                    || err?.status === "RESOURCE_EXHAUSTED"
                    || err?.error?.code === 429;

                if (isQuotaError) {
                    res.set("Retry-After", "15");
                }

                res.status(isQuotaError ? 429 : 502).json({
                    message: isQuotaError
                        ? "Gemini image generation is unavailable for this API key because its image quota is 0. Enable billing or disable AI Image to generate text-only content."
                        : err?.message || "Image generation failed.",
                });
                return;
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

        if(!content || typeof content !== "string" || !content.trim()) {
            res.status(400).json({ message: "Post content is required." });
            return;
        }

        if(!Array.isArray(parsedPlatforms) || parsedPlatforms.length === 0) {
            res.status(400).json({ message: "At least one platform is required." });
            return;
        }

        if(!scheduledFor || Number.isNaN(new Date(scheduledFor).getTime())) {
            res.status(400).json({ message: "A valid scheduled date and time are required." });
            return;
        }

        const allowedPlatforms = [
            "twitter",
            "linkedin",
            "facebook",
            "instagram",
            "facebook_page",
            "linkedin_page",
            "instagram_business",
        ];
        if(parsedPlatforms.some((platform) => !allowedPlatforms.includes(platform))) {
            res.status(400).json({ message: "One or more selected platforms are invalid." });
            return;
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
        console.error("schedulePost error:", error?.response?.data || error);
        const isCloudinaryError = Number(error?.http_code) === 403;
        const statusCode = isCloudinaryError
            ? 502
            : error?.statusCode || error?.response?.status || 500;
        res.status(statusCode).json({
            message: isCloudinaryError
                ? "Cloudinary authenticated successfully but rejected the media upload."
                : error?.message || error?.response?.data?.message || "Failed to schedule post.",
        });
    }
}
