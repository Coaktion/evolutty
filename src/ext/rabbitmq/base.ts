import { Channel, connect } from 'amqplib';

import { LoggerService } from '../../logging';
import { RabbitMQClientOptions } from './types';

export class BaseClient extends LoggerService {
  queueName: string;
  clientOptions: RabbitMQClientOptions;

  constructor(queuName: string, clientOptions: RabbitMQClientOptions) {
    super();
    this.queueName = queuName;
    this.clientOptions = clientOptions;
  }

  async connect(): Promise<Channel> {
    const connection = await connect(this.clientOptions);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName, {
      durable: true
    });
    return channel;
  }

  async stop() {
    const channel = await this.connect();
    await channel.close();
  }
}
