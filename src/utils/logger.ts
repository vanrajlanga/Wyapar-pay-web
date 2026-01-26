/**
 * Logger Service
 * Centralized logging with different levels
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class LoggerService {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.isDevelopment && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'info':
        // eslint-disable-next-line no-console
        console.log(prefix, message, data || '');
        break;
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(prefix, message, data || '');
        break;
      case 'error':
        // eslint-disable-next-line no-console
        console.error(prefix, message, data || '');
        break;
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(prefix, message, data || '');
        break;
    }
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: unknown, data?: unknown): void {
    this.log('error', message, { error, ...(data as Record<string, unknown>) });
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  logApiCall(method: string, endpoint: string, data?: unknown): void {
    this.debug(`API ${method} ${endpoint}`, data);
  }

  logApiResponse(endpoint: string, status: number, data?: unknown): void {
    this.debug(`API Response ${endpoint}`, { status, data });
  }
}

// Export singleton instance
export const logger = new LoggerService();
