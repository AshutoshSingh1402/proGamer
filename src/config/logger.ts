// src/logger.ts
import { createLogger, format, transports } from 'winston';
import type { StreamOptions } from 'morgan';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),          // Adds color to console logs
    timestamp(),         // Adds timestamp
    logFormat            // Custom log message format
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Optional: Stream support for morgan or other middlewares
logger.stream: StreamOptions = {
  write(message: string) {
    logger.http(message.trim());
  },
};

export default logger;
