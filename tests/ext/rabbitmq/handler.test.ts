import * as amqplib from 'amqplib';

import {
  RabbitMQClientOptions,
  RabbitMQHandler,
  RabbitMQProvider
} from '../../../src';

jest.mock('amqplib');

describe('RabbitMQHandler', () => {
  let handler: RabbitMQHandler;
  const provider = new RabbitMQProvider(
    'test-queue',
    {} as RabbitMQClientOptions
  );
  const mockAmqplib = amqplib as jest.Mocked<typeof amqplib>;
  let mockChannel: amqplib.Channel;

  beforeEach(() => {
    jest.clearAllMocks();

    mockChannel = {
      consume: jest.fn(),
      assertQueue: jest.fn(),
      ack: jest.fn(),
      close: jest.fn(),
      nack: jest.fn()
    } as unknown as amqplib.Channel;

    mockAmqplib.connect.mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue(mockChannel)
    } as unknown as amqplib.Connection);

    handler = new RabbitMQHandler(provider);
  });

  it('should to throw not implemented error', async () => {
    await expect(handler.handle({}, {})).rejects.toThrowError(
      'Method not implemented'
    );
  });

  it('should start to consume the queue', async () => {
    await handler.poll();

    expect(mockAmqplib.connect).toHaveBeenCalledWith(
      handler.client.clientOptions
    );
    expect(mockChannel.assertQueue).toHaveBeenCalledWith('test-queue', {
      durable: true
    });
    expect(mockChannel.consume).toHaveBeenCalledWith(
      'test-queue',
      handler.processMessage
    );
  });

  describe('processMessage', () => {
    const message = {
      content: Buffer.from(JSON.stringify({ test: 'test' })),
      fields: {},
      properties: {}
    } as amqplib.Message;

    const messageNotProcessedSpy = jest.spyOn(provider, 'messageNotProcessed');
    const confirmMessageSpy = jest.spyOn(provider, 'confirmMessage');

    it('should translate the message', async () => {
      const translatorSpy = jest.spyOn(
        handler.messageTranslator,
        'translateMessage'
      );

      await handler.processMessage(message);

      expect(translatorSpy).toHaveBeenCalledWith(message, 'json');
    });

    it('should confirm the message when handled', async () => {
      handler.handle = jest.fn().mockResolvedValue(true);

      await handler.processMessage(message);

      expect(handler.handle).toHaveBeenCalledWith(
        { test: 'test' },
        {
          token: 'json',
          fields: {},
          properties: {}
        }
      );
      expect(messageNotProcessedSpy).not.toHaveBeenCalled();
      expect(confirmMessageSpy).toHaveBeenCalledWith(message);
    });

    it('should reject the message when not handled', async () => {
      handler.handle = jest.fn().mockRejectedValue(new Error());
      const messageNotProcessedSpy = jest.spyOn(
        provider,
        'messageNotProcessed'
      );
      const confirmMessageSpy = jest.spyOn(provider, 'confirmMessage');

      await handler.processMessage(message);

      expect(handler.handle).toHaveBeenCalledWith(
        { test: 'test' },
        {
          token: 'json',
          fields: {},
          properties: {}
        }
      );
      expect(confirmMessageSpy).not.toHaveBeenCalled();
      expect(messageNotProcessedSpy).toHaveBeenCalledWith(message);
    });

    it('should confirm message when not handled and deleteMessage property is true', async () => {
      handler.handle = jest.fn().mockRejectedValue({ deleteMessage: true });

      await handler.processMessage(message);

      expect(handler.handle).toHaveBeenCalledWith(
        { test: 'test' },
        {
          token: 'json',
          fields: {},
          properties: {}
        }
      );
      expect(messageNotProcessedSpy).not.toHaveBeenCalled();
      expect(confirmMessageSpy).toHaveBeenCalledWith(message);
    });
  });

  it('should to call poll method', async () => {
    handler.handle = jest.fn().mockResolvedValue(true);
    const pollSpy = jest.spyOn(handler, 'poll');

    await handler.start();

    expect(pollSpy).toHaveBeenCalled();
  });
});
