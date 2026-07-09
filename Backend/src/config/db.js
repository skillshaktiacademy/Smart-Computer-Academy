import mongoose from 'mongoose';
import dns from 'dns';
import logger from './logger.js';
import dotenv from 'dotenv';
import { DB_NAME } from '../constants.js';

dotenv.config();

// Some machines use a loopback-only DNS resolver (e.g. a local proxy/VPN) that
// refuses SRV queries, which breaks mongodb+srv:// connection strings with
// "querySrv ECONNREFUSED". In that case, fall back to public DNS so Atlas SRV
// records resolve. This is a no-op on hosts with a normal DNS configuration.
try {
  const servers = dns.getServers();
  if (servers.length && servers.every((s) => s.startsWith('127.') || s === '::1')) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
} catch {
  /* ignore DNS reconfiguration errors */
}

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

const connectDB = async (retryCount = 0) => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(`${uri}/${DB_NAME}`);

    console.log(`🟢  MongoDB connected`);
    console.log(`📦  Database: ${conn.connection.name}  (${conn.connection.host})`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);

    if (retryCount < MAX_RETRIES) {
      const nextRetry = retryCount + 1;
      const delay = RETRY_INTERVAL * Math.pow(2, retryCount); // Exponential backoff
      logger.info(`Retrying MongoDB connection in ${delay / 1000}s... (Attempt ${nextRetry}/${MAX_RETRIES})`);
      
      setTimeout(() => connectDB(nextRetry), delay);
    } else {
      logger.error('Failed to connect to MongoDB after maximum retries. Exiting...');
      process.exit(1);
    }
  }
};

// Connection Event Listeners
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

// Graceful Shutdown
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Closing MongoDB connection...`);
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed successfully.');
    process.exit(0);
  } catch (err) {
    logger.error(`Error closing MongoDB connection: ${err.message}`);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default connectDB;
