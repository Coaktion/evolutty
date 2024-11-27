import { ListQueuesCommand, SQSClient } from '@aws-sdk/client-sqs';

import {
  AbstractMessageTranslator,
  SNSQueueMessageTranslator,
  SQSClientOptions,
  SQSHandler,
  SQSMessageTranslator,
  SQSRouter
} from '../../../src';

class Handler extends SQSHandler {
  public start() {}
  public async handle() {
    return true;
  }
}

class MessageTranslator extends AbstractMessageTranslator {
  translateMessage() {
    return { content: 'content', metadata: 'metadata' };
  }
}

describe('SQSRouter', () => {
  it('should return a router object', () => {
    expect(SQSHandler).toBeDefined();
  });

  it('should throw an error when queue name is not provided', () => {
    expect(() => new SQSRouter('', Handler, {})).toThrowError(
      'Queue name must be provided'
    );
  });

  it('should return a router object', async () => {
    const clientOptions = {} as SQSClientOptions;
    const router = new SQSRouter('test', Handler, clientOptions);

    await router.start();

    expect(router).toBeDefined();
    expect(clientOptions.messageTranslator).toBeDefined();
    expect(clientOptions.messageTranslator).toBeInstanceOf(
      SNSQueueMessageTranslator
    );
  });

  it('should stop all instances', async () => {
    const clientOptions = {} as SQSClientOptions;
    const router = new SQSRouter('test', Handler, clientOptions);
    const instance = {
      stop: jest.fn()
    };
    router.instances.push(instance);
    const processExit = jest.fn();
    process.exit = processExit as unknown as (code?: number) => never;
    await router.stop();
    expect(instance.stop).toHaveBeenCalled();
    expect(processExit).toHaveBeenCalled();
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

  it(`should handle prefix based queues`, async () => {
    const clientOptions = {
      prefixBasedQueues: true
    } as SQSClientOptions;

    const mockSend = jest.fn().mockResolvedValueOnce({
      QueueUrls: [
        'http://localhost:4566/123456789012/test-1',
        'http://localhost:4566/123456789012/test-2'
      ]
    });

    SQSClient.prototype.send = mockSend;

    const router = new SQSRouter('test', Handler, clientOptions);

    await router.start();

    expect(router).toBeDefined();
    expect(mockSend).toHaveBeenCalledWith(expect.any(ListQueuesCommand));
  });

  it('when does the clientOptions messageTranslator come', async () => {
    const clientOptions: SQSClientOptions = {
      messageTranslator: new MessageTranslator()
    };
    const router = new SQSRouter('test', Handler, clientOptions);

    expect(router).toBeDefined();
    expect(router.clientOptions.messageTranslator).toBeDefined();
    expect(router.clientOptions.messageTranslator).toBeInstanceOf(
      MessageTranslator
    );
  });

  it(`should to throw an error when no urls are found with given prefix`, async () => {
    try {
      const clientOptions = {
        prefixBasedQueues: true
      } as SQSClientOptions;

      const mockSend = jest.fn().mockResolvedValueOnce({
        QueueUrls: undefined
      });

      SQSClient.prototype.send = mockSend;
      SQSClient.prototype.destroy = jest.fn();
      const router = new SQSRouter('test', Handler, clientOptions);

      await router.start();

      expect(router).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('No queues found with prefix: test');
    }
  });
});
