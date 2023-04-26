import { Message } from 'amqplib';

import { BaseClient } from './base';
import { RabbitMQMessageTranslator } from './message-translators';
import { RabbitMQProvider } from './provider';

export class RabbitMQHandler {
  provider: RabbitMQProvider;
  client: BaseClient;
  messageTranslator: RabbitMQMessageTranslator;
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
        await this.provider.confirmMessage(message);
      }
    } catch (err) {
      await this.provider.messageNotProcessed(message);
    }
  };

  async poll() {
    const channel = await this.client.connect();
    await channel.assertQueue(this.client.queueName, {
      durable: true
    });

    await channel.consume(this.client.queueName, this.processMessage);
  }

  async handle(_content: object, _metadata: object): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
