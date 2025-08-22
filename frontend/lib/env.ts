import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // GitHub OAuth credentials
    GITHUB_CLIENT_ID: z.string().min(10, "GITHUB_CLIENT_ID is too short"),
    GITHUB_CLIENT_SECRET: z.string().min(20, "GITHUB_CLIENT_SECRET is too short"),

    // Cloudinary server-side URL
    CLOUDINARY_URL: z.string().startsWith("cloudinary://", "CLOUDINARY_URL must start with cloudinary://"),

    // Google OAuth credentials
    GOOGLE_CLIENT_ID: z.string().min(10, "GOOGLE_CLIENT_ID is too short"),
    GOOGLE_CLIENT_SECRET: z.string().min(20, "GOOGLE_CLIENT_SECRET is too short"),

    // Arcjet API key
    ARCJET_KEY: z.string().min(10, "ARCJET_KEY is too short"),

    // Environment
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    // Public variables accessible in the frontend
    NEXT_PUBLIC_API_URL: z.string().url("NEXT_PUBLIC_API_URL must be a valid URL"),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: z.string().url("NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL must be a valid URL"),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1, "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET cannot be empty"),
  },
  experimental__runtimeEnv: {
    // Optional: runtime environment access
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
});
