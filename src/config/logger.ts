import winston from 'winston';
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.colorize(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Function to allow format anything to be printable,
// Logger only allows strings, so this formats it to a printable string
function parseMessage(message: any): string {
  switch (typeof message) {
    case 'string':
      return message;
    case 'object':
      return JSON.stringify(message);
    case 'number':
    case 'bigint':
      return message.toString();
    case 'boolean':
      return message ? 'true' : 'false';
    default:
      return '';
  }
}

export default {
  info: (msg: any) => logger.info(parseMessage(msg)),
  error: (msg: any) => logger.error(parseMessage(msg)),
  debug: (msg: any) => logger.debug(parseMessage(msg)),
  warn: (msg: any) => logger.warn(parseMessage(msg))
};
