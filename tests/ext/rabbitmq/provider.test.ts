import * as amqplib from 'amqplib';

import { RabbitMQClientOptions, RabbitMQProvider } from '../../../src';

jest.mock('amqplib');

describe('RabbitMQProvider', () => {
  let provider: RabbitMQProvider;

  const mockAmqplib = amqplib as jest.Mocked<typeof amqplib>;

  let mockChannel: amqplib.Channel;

  const clientOptions = {
    username: 'guest',
    password: 'guest'
  } as RabbitMQClientOptions;

  beforeEach(() => {
    provider = new RabbitMQProvider('test-queue', clientOptions);

    mockChannel = {
      ack: jest.fn(),
      close: jest.fn(),
      nack: jest.fn()
    } as unknown as amqplib.Channel;

    mockAmqplib.connect.mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue(mockChannel)
    } as unknown as amqplib.Connection);
  });

  it('Should connect to RabbitMQ and delete a message when its confirmed', async () => {
    const message = {
      content: Buffer.from('test'),
      fields: {
        deliveryTag: 1
      }
    } as amqplib.Message;

    await provider.confirmMessage(message);

    expect(mockChannel.ack).toHaveBeenCalled();
    expect(mockChannel.close).toHaveBeenCalled();
  });

  it('Should connect to RabbitMQ and reject a message when its not processed', async () => {
    const message = {
      content: Buffer.from('test'),
      fields: {
        deliveryTag: 1
      }
    } as amqplib.Message;

    await provider.messageNotProcessed(message);

    expect(mockChannel.nack).toHaveBeenCalled();
    expect(mockChannel.close).toHaveBeenCalled();
  });
});
