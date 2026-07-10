import { loadEnv, validateEnv } from "./shared/utils/env.utils.js";

// Load and validate environment variables BEFORE any other local module is
// imported. Static ESM imports are hoisted above module-body statements, so
// `import { app } from "./app.js"` (which reads process.env.CORS_ORIGIN at
// cors() setup time) must be a dynamic import here — otherwise it would
// evaluate before loadEnv() ever runs, and CORS_ORIGIN would always be
// undefined regardless of what's in .env.
loadEnv();
const env = validateEnv();

const { default: connectDB } = await import("./shared/db/DbConnect.js");
const { app } = await import("./app.js");
const { default: logger } = await import("./shared/utils/logger.js");

const PORT = env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT} [${env.NODE_ENV}]`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
    });

    server.on("error", (error) => {
      logger.error(`Express server error: ${error.message}`);
      throw error;
    });
  })
  .catch((err) => {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });
