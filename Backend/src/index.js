import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import logger from "./config/logger.js";

// Load environment variables
const envPath = process.env.NODE_ENV === "development" ? ".env.development" : ".env";
dotenv.config({ path: `./${envPath}` });
dotenv.config({ path: "./.env" }); // Fallback

console.log(`📄  Loaded env: ${envPath}  [NODE_ENV=${process.env.NODE_ENV || "development"}]`);
console.log(`📄  Loaded env: .env  [NODE_ENV=${process.env.NODE_ENV || "development"}]`);

// Basic validation
const requiredEnv = [
  "MONGODB_URI", 
  "ACCESS_TOKEN_SECRET", 
  "REFRESH_TOKEN_SECRET", 
  "RESET_PASSWORD_SECRET"
];
const missing = requiredEnv.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`❌  Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`✅  Environment variables validated.`);

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n⚙️  Server  →  http://localhost:${PORT}  [${process.env.NODE_ENV || "development"}]`);
      console.log(`🔗  Health  →  http://localhost:${PORT}/api/v1/health\n`);
    });
    
    app.on("error", (error) => {
      console.error("❌  Express server error: ", error);
      throw error;
    });
  })
  .catch((err) => {
    logger.error("MONGO db connection failed !!! ", err);
  });
