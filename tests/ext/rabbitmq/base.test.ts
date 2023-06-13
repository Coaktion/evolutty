import { BaseClient } from '@/ext/rabbitmq/base';
import { RabbitMQClientOptions } from '@/index';
import * as amqplib from 'amqplib';

jest.mock('amqplib');

describe('BaseClient', () => {
  let client: BaseClient;
  const { connect } = amqplib as jest.Mocked<typeof amqplib>;

  let mockChannel: amqplib.Channel;

  const clienteOptions = {
    username: 'guest',
    password: 'guest'
  } as RabbitMQClientOptions;

  beforeEach(() => {
    client = new BaseClient('test-queue', clienteOptions);
    mockChannel = {
      close: jest.fn(),
      assertQueue: jest.fn()
    } as unknown as amqplib.Channel;

    connect.mockResolvedValue({
      createChannel: jest.fn().mockResolvedValueOnce(mockChannel)
    } as unknown as amqplib.Connection);
  });

  it('should connect to RabbitMQ with the provided options and return a channel', async () => {
    const response = await client.connect();

    expect(connect).toHaveBeenCalledTimes(1);
    expect(mockChannel.assertQueue).toHaveBeenCalledTimes(1);
    expect(connect).toHaveBeenCalledWith(clienteOptions);
    expect(response).toEqual(mockChannel);
  });

  it('should stop the RabbitMQ client', async () => {
    await client.stop();

    expect(mockChannel.close).toHaveBeenCalledTimes(1);
  });
});
