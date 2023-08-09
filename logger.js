// logger.js

const winston = require('winston');

// Create a Winston logger instance and configure it to log to the app.log file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

module.exports = logger;
