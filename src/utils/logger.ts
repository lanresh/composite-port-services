import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';

// Fallback for LOG_DIR
const logDir: string = join(__dirname, LOG_DIR || './logs');

// Validate LOG_DIR
if (!logDir) {
  throw new Error('LOG_DIR is not defined');
}

// Ensure logs directory exists
if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true }); // Create parent directories if necessary
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// Create logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'debug'), // Logs saved in /logs/debug/
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'error'), // Logs saved in /logs/error/
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

// Add console transport
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
