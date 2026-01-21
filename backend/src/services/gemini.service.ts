import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { logger } from "../utils/logger";

const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const MODEL_PRIORITY = [
    "gemini-3-flash-preview", 
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-pro",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite"
];

export class GeminiService {
    /**
     * Generates content using a retry mechanism across multiple model versions.
     */
    async generateContent(prompt: string, systemInstruction?: string): Promise<string> {
        let lastError: any = null;

        for (const modelName of MODEL_PRIORITY) {
            try {
                logger.debug(`[Gemini] Attempting with model: ${modelName}`);

                const response = await genAI.models.generateContent({
                    model: modelName,
                    contents: prompt,
                    config: {
                        systemInstruction: systemInstruction,
                    },
                });

                const text = response.text;

                if (!text) throw new Error("Empty response from AI");

                logger.info(`[Gemini] Success with ${modelName}`);
                return text;

            } catch (error: any) {
                lastError = error;
                logger.warn(`[Gemini] Failed with ${modelName}: ${error.message}`);
                // Continue to next model
            }
        }

        logger.error("[Gemini] All models failed", { error: lastError });
        throw new Error("Service unavailable: Unable to generate summary after multiple attempts.");
    }
}

export const geminiService = new GeminiService();
