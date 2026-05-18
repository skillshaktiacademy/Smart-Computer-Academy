import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import franchiseRouter from "./modules/franchise/franchise.routes.js";
import studentRouter from "./modules/student/student.routes.js";
import courseRouter from "./modules/course/course.routes.js";
import attendanceRouter from "./modules/attendance/attendance.routes.js";
import feeRouter from "./modules/fee/fee.routes.js";
import examRouter from "./modules/exam/exam.routes.js";
import certificateRouter from "./modules/certificate/certificate.routes.js";
import noticeRouter from "./modules/notice/notice.routes.js";
import materialRouter from "./modules/material/material.routes.js";
import publicRouter from "./modules/public/public.routes.js";
import enrollmentRouter from "./modules/enrollment/enrollment.routes.js";
import resultRouter from "./modules/exam/result.routes.js";
import dashboardRouter from "./modules/dashboard/dashboard.routes.js";
import logger from "./config/logger.js";

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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/franchises", franchiseRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/fees", feeRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/certificates", certificateRouter);
app.use("/api/v1/notices", noticeRouter);
app.use("/api/v1/materials", materialRouter);
app.use("/api/v1/public", publicRouter);
app.use("/api/v1/enrollments", enrollmentRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Centralized error handling
app.use(errorHandler);

export { app };
