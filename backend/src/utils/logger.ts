enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(level: LogLevel, message: string, context?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };
  }

  private output(entry: LogEntry): void {
    const logMessage = `[${entry.timestamp}] ${entry.level}: ${entry.message}`;
    const logData = entry.context ? JSON.stringify(entry.context, null, 2) : '';

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(logMessage);
        if (logData) console.error(logData);
        break;
      case LogLevel.WARN:
        console.warn(logMessage);
        if (logData) console.warn(logData);
        break;
      case LogLevel.INFO:
        console.info(logMessage);
        if (logData && this.isDevelopment) console.info(logData);
        break;
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(logMessage);
          if (logData) console.debug(logData);
        }
        break;
    }
  }

  error(message: string, context?: any): void {
    this.output(this.formatLog(LogLevel.ERROR, message, context));
  }

  warn(message: string, context?: any): void {
    this.output(this.formatLog(LogLevel.WARN, message, context));
  }

  info(message: string, context?: any): void {
    this.output(this.formatLog(LogLevel.INFO, message, context));
  }

  debug(message: string, context?: any): void {
    this.output(this.formatLog(LogLevel.DEBUG, message, context));
  }
}

export default new Logger();