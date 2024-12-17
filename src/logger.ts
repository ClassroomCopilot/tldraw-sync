import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOG_DIR = process.env.LOG_PATH || './logs';
const LOG_FILE = join(LOG_DIR, 'server.log');

// Ensure log directory exists
if (!existsSync(LOG_DIR)) {
  mkdirSync(LOG_DIR, { recursive: true });
}

type LogLevel = 'INFO' | 'ERROR' | 'DEBUG' | 'WARN';

function formatLog(level: LogLevel, message: string, data?: any): string {
  const timestamp = new Date().toISOString();
  const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
  return `[${timestamp}] [${level}] ${message}${dataStr}\n`;
}

export const logger = {
  info: (message: string, data?: any) => {
    const log = formatLog('INFO', message, data);
    console.log(log);
    Bun.write(LOG_FILE, log, { append: true });
  },
  
  error: (message: string, data?: any) => {
    const log = formatLog('ERROR', message, data);
    console.error(log);
    Bun.write(LOG_FILE, log, { append: true });
  },
  
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      const log = formatLog('DEBUG', message, data);
      console.debug(log);
      Bun.write(LOG_FILE, log, { append: true });
    }
  },
  
  warn: (message: string, data?: any) => {
    const log = formatLog('WARN', message, data);
    console.warn(log);
    Bun.write(LOG_FILE, log, { append: true });
  }
};