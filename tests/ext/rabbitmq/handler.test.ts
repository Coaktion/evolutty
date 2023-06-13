import { RabbitMQClientOptions, RabbitMQHandler } from '@/index';
import * as amqplib from 'amqplib';

jest.mock('amqplib');

describe('RabbitMQHandler', () => {
  let handler: RabbitMQHandler;

  const { connect } = amqplib as jest.Mocked<typeof amqplib>;
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

    connect.mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue(mockChannel)
    } as unknown as amqplib.Connection);

    handler = new RabbitMQHandler({} as RabbitMQClientOptions, 'test-queue');
    handler.channel = mockChannel;
  });

  it('should to throw not implemented error', async () => {
    await expect(handler.handle({}, {})).rejects.toThrowError(
      'Method not implemented'
    );
  });

  it('should start to consume the queue', async () => {
    await handler.poll();

    expect(connect).toHaveBeenCalledWith(handler.client.clientOptions);
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

      const response = await handler.processMessage(message);

      expect(handler.handle).toHaveBeenCalledWith(
        { test: 'test' },
        {
          token: 'json',
          fields: {},
          properties: {}
        }
      );
      expect(mockChannel.nack).not.toHaveBeenCalled();
      expect(mockChannel.ack).toHaveBeenCalledWith(message);
      expect(response).toBe(void 0);
    });

    it('should reject the message when not handled', async () => {
      handler.handle = jest.fn().mockRejectedValue(new Error());

      await handler.processMessage(message);

      expect(handler.handle).toHaveBeenCalledWith(
        { test: 'test' },
        {
          token: 'json',
          fields: {},
          properties: {}
        }
      );
      expect(mockChannel.ack).not.toHaveBeenCalled();
      expect(mockChannel.nack).toHaveBeenCalledWith(message);
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
      expect(mockChannel.ack).toHaveBeenCalled();
      expect(mockChannel.nack).not.toHaveBeenCalledWith(message);
    });
  });

  it('should to call poll method', async () => {
    handler.handle = jest.fn().mockResolvedValue(true);
    const pollSpy = jest.spyOn(handler, 'poll');

    await handler.start();

    expect(pollSpy).toHaveBeenCalled();
  });
});
