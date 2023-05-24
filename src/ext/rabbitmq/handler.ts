import { Channel, Message } from 'amqplib';

import { BaseClient } from './base';
import { RabbitMQMessageTranslator } from './message-translators';
import { RabbitMQProvider } from './provider';

export class RabbitMQHandler {
  provider: RabbitMQProvider;
  client: BaseClient;
  messageTranslator: RabbitMQMessageTranslator;
  channel: Channel;
  constructor(provider: RabbitMQProvider) {
    this.provider = provider;
    this.client = new BaseClient(provider.queueName, provider.clientOptions);
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
        await this.provider.confirmMessage(message, this.channel);
      }
    } catch (err) {
      if (err.deleteMessage) {
        await this.provider.confirmMessage(message, this.channel);
        return;
      }
      this.channel.nack(message);
      await this.channel.close();
    }
  };

  async poll() {
    this.channel = await this.provider.connect();

    await this.channel.consume(this.provider.queueName, this.processMessage);
  }

  async handle(_content: object, _metadata: object): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
