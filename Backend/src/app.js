import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./shared/middlewares/error.middleware.js";
import { registerRoutes } from "./routes.js";
import logger from "./shared/utils/logger.js";

const app = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Logger
const morganFormat = process.env.NODE_ENV === "development" ? "dev" : "combined";
app.use(morgan(morganFormat, {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Routes
registerRoutes(app);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Centralized error handling (must be mounted last)
app.use(errorHandler);

export { app };
