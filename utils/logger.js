const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

const levels = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  
  const fileMessage = data 
    ? `${logMessage}\n${JSON.stringify(data, null, 2)}\n`
    : `${logMessage}\n`;
  
  fs.appendFileSync(logFile, fileMessage);
}

module.exports = {
  info: (message, data) => log(levels.INFO, message, data),
  warn: (message, data) => log(levels.WARN, message, data),
  error: (message, data) => log(levels.ERROR, message, data),
  debug: (message, data) => log(levels.DEBUG, message, data)
};
