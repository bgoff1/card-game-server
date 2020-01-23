import logger from '@core/config/logger';

const printText: string = 'me';

beforeAll(() => {
  logger.logger.silent = true;
});

test('it should parse the message', () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(logger.parseMessage(obj)).toEqual(JSON.stringify(obj));
  expect(logger.parseMessage(printText)).toEqual(printText);
  const num = 123;
  expect(logger.parseMessage(num)).toEqual(num.toString());
  const bool = true;
  expect(logger.parseMessage(bool)).toEqual('true');
  expect(logger.parseMessage(!bool)).toEqual('false');
});

test('it should call parse message in info', () => {
  const spy = jest.spyOn(logger, 'parseMessage');

  logger.info(printText);

  expect(spy).toBeCalledWith(printText);
});

test('it should call winston info', () => {
  const loggerSpy = jest.spyOn(logger, 'info');

  logger.info(printText);

  expect(loggerSpy).toBeCalledWith(printText);
});

test('it should call parse message in debug', () => {
  const spy = jest.spyOn(logger, 'parseMessage');

  logger.debug(printText);

  expect(spy).toBeCalledWith(printText);
});

test('it should call winston debug', () => {
  const loggerSpy = jest.spyOn(logger, 'debug');

  logger.debug(printText);

  expect(loggerSpy).toBeCalledWith(printText);
});

test('it should call parse message in warn', () => {
  const spy = jest.spyOn(logger, 'parseMessage');

  logger.warn(printText);

  expect(spy).toBeCalledWith(printText);
});

test('it should call winston warn', () => {
  const loggerSpy = jest.spyOn(logger, 'warn');

  logger.warn(printText);

  expect(loggerSpy).toBeCalledWith(printText);
});

test('it should call parse message in error', () => {
  const spy = jest.spyOn(logger, 'parseMessage');

  logger.error(printText);

  expect(spy).toBeCalledWith(printText);
});

test('it should call winston error', () => {
  const loggerSpy = jest.spyOn(logger, 'error');

  logger.error(printText);

  expect(loggerSpy).toBeCalledWith(printText);
});
