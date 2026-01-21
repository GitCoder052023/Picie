import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
    PORT: z.string().default('3000'),
    GEMINI_API_KEY: z.string().min(1, "Gemini API Key is required"),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(envParsed.error.format(), null, 4));
    process.exit(1);
}

export const env = envParsed.data;
