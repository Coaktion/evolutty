import { Message } from 'amqplib';

import { BaseClient } from './base';
import { RabbitMQClientOptions } from './types';

export class RabbitMQProvider {
  queueName: string;
  clientOptions: RabbitMQClientOptions;
  client: BaseClient;

  constructor(queueName: string, clientOptions: RabbitMQClientOptions) {
    this.queueName = queueName;
    this.clientOptions = clientOptions;
    this.client = new BaseClient(queueName, clientOptions);
  }

  async confirmMessage(message: Message) {
    const channel = await this.client.connect();
    await channel.ack(message);
    await channel.close();
  }

  async messageNotProcessed(message: Message) {
    const channel = await this.client.connect();
    await channel.nack(message);
    await channel.close();
  }
}
