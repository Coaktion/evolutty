import {
  SNSQueueMessageTranslator,
  SQSClientOptions,
  SQSHandler,
  SQSMessageTranslator,
  SQSRouter
} from '../../../src';

class Handler {
  start = jest.fn();
  async handle() {
    return true;
  }
}

describe('SQSHandler', () => {
  describe('SQSRouter', () => {
    it('should return a router object', () => {
      expect(SQSHandler).toBeDefined();
    });

    it('should throw an error when queue name is not provided', () => {
      expect(() => new SQSRouter('', Handler, {})).toThrowError(
        'Queue name must be provided'
      );
    });

    it('should return a router object', () => {
      const clientOptions = {} as SQSClientOptions;
      const router = new SQSRouter('test', Handler, clientOptions);

      expect(router).toBeDefined();
      expect(clientOptions.messageTranslator).toBeDefined();
      expect(clientOptions.messageTranslator).toBeInstanceOf(
        SNSQueueMessageTranslator
      );
    });

    it('should set message translator to SNSQueueMessageTranslator', () => {
      const clientOptions = {} as SQSClientOptions;
      const router = new SQSRouter('test', Handler, clientOptions);

      expect(router).toBeDefined();
      expect(clientOptions.messageTranslator).toBeDefined();
      expect(clientOptions.messageTranslator).toBeInstanceOf(
        SNSQueueMessageTranslator
      );
    });

    it('should set message translator to SQSMessageTranslator', () => {
      const clientOptions = {
        messageSource: 'SQS'
      } as SQSClientOptions;
      const router = new SQSRouter('test', Handler, clientOptions);

      expect(router).toBeDefined();
      expect(clientOptions.messageTranslator).toBeDefined();
      expect(clientOptions.messageTranslator).toBeInstanceOf(
        SQSMessageTranslator
      );
    });
  });
});
