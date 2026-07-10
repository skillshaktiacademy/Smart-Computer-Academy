import dotenv from "dotenv";
import { z } from "zod";

/**
 * Loads .env.<NODE_ENV> first (if present), then falls back to .env for any
 * keys not already set (override:false preserves whichever loaded first).
 */
export function loadEnv() {
  const envPath = process.env.NODE_ENV === "development" ? ".env.development" : ".env";
  dotenv.config({ path: `./${envPath}` });
  dotenv.config({ path: "./.env", override: false });
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
  RESET_PASSWORD_SECRET: z.string().min(1, "RESET_PASSWORD_SECRET is required"),
  CORS_ORIGIN: z.string().optional(),
  CLIENT_URL: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  // Email (sent via Brevo's SMTP relay, smtp-relay.brevo.com:587).
  // BREVO_API_KEY here is Brevo's "SMTP key" (format xsmtpsib-...) used as
  // the SMTP AUTH password — not the REST "API Keys" key (xkeysib-...),
  // which is a different credential for Brevo's HTTP API.
  BREVO_API_KEY: z.string().optional(),
  BREVO_SMTP_LOGIN: z.string().optional(),
  FROM_EMAIL: z.string().optional(),
  FROM_NAME: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),
});

/**
 * Validates process.env against envSchema. Exits the process on failure in
 * production; logs a warning and continues in development so local setup
 * with a partial .env doesn't block iterating on unrelated features.
 * @returns {object} the parsed/typed env values
 */
export function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    console.error("❌  Invalid environment variables:", fieldErrors);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    return envSchema.partial().parse(process.env);
  }

  console.log("✅  Environment variables validated.");
  return parsed.data;
}
