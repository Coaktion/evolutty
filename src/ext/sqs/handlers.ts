import { AbstractMessageTranslator } from '@/message-translators';
import logging from '../../logging';
import { timeout } from '../../utils';
import { BaseSQS } from './base';
import { SQSProvider } from './providers';
import { SQSClientOptions } from './types';

export class SQSHandler extends BaseSQS {
  provider: SQSProvider;
  messageTranslator: AbstractMessageTranslator;
  started: boolean;
  pollingWaitTimeMs: number;
  constructor(queueName: string, clientOptions: SQSClientOptions) {
    super(clientOptions);
    this.provider = new SQSProvider(queueName, clientOptions);
    this.messageTranslator = clientOptions.messageTranslator;
    this.pollingWaitTimeMs = 30000;
  }

  start(): void {
    if (!this.started) {
      logging.info(`Starting AWS Queue ${this.provider.queueName}`);
      this.started = true;
      this.poll();
    }
  }

  stop(): void {
    if (!this.started) {
      logging.info(`Stopping AWS Queue ${this.provider.queueName}`);
      return void 0;
    }

    logging.info(`Stopping AWS Queue ${this.provider.queueName}`);
    this.started = false;
  }

  async processMessage(message: any): Promise<void> {
    const { content, metadata } =
      this.messageTranslator.translateMessage(message);
    try {
      const handled = await this.handle(content, metadata);
      if (handled) {
        await this.provider.confirmMessage(message);
      }
    } catch (err) {
      logging.error(`Error handling message ${err}`);
      if (err.deleteMessage) {
        await this.provider.confirmMessage(message);
      } else {
        await this.provider.messageNotProcessed(message);
      }
    }
  }

  async poll(): Promise<void> {
    if (!this.started) {
      logging.info(
        `Poll was called while consumer was stopped, cancelling poll...`
      );
      return void 0;
    }

    logging.info(`Polling AWS Queue ${this.provider.queueName}`);
    const messages = await this.provider.fetchMessages();
    if (messages) {
      logging.info(
        `Received ${messages.length} messages from queue ${this.provider.queueName}`
      );
      messages.forEach((message: any) => {
        this.processMessage(message);
      });
    }

    this.callPoll();
  }

  async callPoll(): Promise<void> {
    await timeout(this.pollingWaitTimeMs);
    await this.poll();
  }

  async handle(_content: object, _metada: object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
