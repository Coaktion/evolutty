import { Channel, Message } from 'amqplib';

import { BaseClient } from './base';
import { RabbitMQClientOptions } from './types';

export class RabbitMQProvider extends BaseClient {
  queueName: string;
  clientOptions: RabbitMQClientOptions;
  client: BaseClient;

  constructor(queueName: string, clientOptions: RabbitMQClientOptions) {
    super(queueName, clientOptions);
    this.queueName = queueName;
    this.clientOptions = clientOptions;
  }

  async confirmMessage(message: Message, channel: Channel) {
    channel.ack(message);
  }

  async messageNotProcessed(message: Message, channel: Channel) {
    channel.nack(message);
  }
}
