import winston from 'winston';

export class Logger {
  logger: winston.Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.colorize(),
      transports: [
        new winston.transports.Console({ format: winston.format.simple() })
      ]
    });
  }

  // Function to allow format anything to be printable,
  // Logger only allows strings, so this formats it to a printable string
  parseMessage(message: any): string {
    switch (typeof message) {
      case 'object':
        return JSON.stringify(message);
      case 'number':
        return message.toString();
      case 'boolean':
        return message ? 'true' : 'false';
    }
    return message;
  }

  info(message: any) {
    this.logger.info(this.parseMessage(message));
  }
  error(message: any) {
    this.logger.error(this.parseMessage(message));
  }
  debug(message: any) {
    this.logger.debug(this.parseMessage(message));
  }
  warn(message: any) {
    this.logger.info(this.parseMessage(message));
  }
}

export default new Logger();
