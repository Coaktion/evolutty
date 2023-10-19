import { ListQueuesCommand, SQSClient } from '@aws-sdk/client-sqs';

import {
  SNSQueueMessageTranslator,
  SQSClientOptions,
  SQSHandler,
  SQSMessageTranslator,
  SQSRouter
} from '../../../src';

class Handler {
  public start() {}
  public async handle() {
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

    it.each([
      undefined,
      [
        'http://localhost:4566/000000000000/test',
        'http://localhost:4566/000000000000/test2'
      ]
    ])(`should handle prefix based queues`, async (urls) => {
      const clientOptions = {
        prefixBasedQueues: true
      } as SQSClientOptions;

      const mockSend = jest.fn().mockResolvedValueOnce({
        QueueUrls: urls
      });

      SQSClient.prototype.send = mockSend;

      const router = new SQSRouter('test', Handler, clientOptions);

      expect(router).toBeDefined();
      expect(mockSend).toHaveBeenCalledWith(expect.any(ListQueuesCommand));
    });
  });
});
