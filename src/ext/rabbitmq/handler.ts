import { Channel, Message } from 'amqplib';

import { BaseClient } from './base';
import { RabbitMQMessageTranslator } from './message-translators';
import { RabbitMQClientOptions } from './types';

export class RabbitMQHandler {
  queueName: string;
  clientOptions: RabbitMQClientOptions;
  client: BaseClient;
  messageTranslator: RabbitMQMessageTranslator;
  channel: Channel;
  constructor(clientOptions: RabbitMQClientOptions, queueName: string) {
    this.queueName = queueName;
    this.clientOptions = clientOptions;
    this.client = new BaseClient(this.queueName, this.clientOptions);
    this.messageTranslator = new RabbitMQMessageTranslator();
  }

  async start() {
    await this.poll();
  }

  processMessage = async (message: Message): Promise<void> => {
    const { content, metadata } = this.messageTranslator.translateMessage(
      message,
      'json'
    );
    try {
      const handled = await this.handle(content, metadata);
      if (handled) {
        this.channel.ack(message);
      }
    } catch (err) {
      if (err.deleteMessage) {
        return this.channel.ack(message);
      }
      this.channel.nack(message);
    }
  };

  async poll() {
    this.channel = await this.client.connect();

    await this.channel.consume(this.client.queueName, this.processMessage);
  }

  async handle(_content: object, _metadata: object): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
