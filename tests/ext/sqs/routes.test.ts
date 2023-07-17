import {
  SNSQueueMessageTranslator,
  SNSQueueRouter,
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
        SQSMessageTranslator
      );
    });
  });

  describe('SNSQueueRouter', () => {
    it('should return a router object', () => {
      expect(SQSHandler).toBeDefined();
    });

    it('should throw an error when queue name is not provided', () => {
      expect(() => new SNSQueueRouter('', Handler, {})).toThrowError(
        'Queue name must be provided'
      );
    });

    it('should return a router object', () => {
      const clientOptions = {} as SQSClientOptions;
      const router = new SNSQueueRouter('test', Handler, clientOptions);

      expect(router).toBeDefined();
      expect(clientOptions.messageTranslator).toBeDefined();
      expect(clientOptions.messageTranslator).toBeInstanceOf(
        SNSQueueMessageTranslator
      );
    });
  });
});
