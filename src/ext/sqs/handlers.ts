import { debug } from 'console';

import { timeout } from '../../utils';
import { BaseSQS } from './base';
import { SQSMessageTranslator } from './message-translators';
import { SQSProvider } from './providers';
import { SQSClientOptions } from './types';

export class SQSHandler extends BaseSQS {
  provider: SQSProvider;
  messageTranslator: SQSMessageTranslator;
  started: boolean;
  pollingWaitTimeMs: number;
  constructor(queueName: string, clientOptions: SQSClientOptions) {
    super(clientOptions);
    this.provider = new SQSProvider(queueName, clientOptions);
    this.messageTranslator = new SQSMessageTranslator();
    this.pollingWaitTimeMs = 1000;
  }

  start(): void {
    if (!this.started) {
      debug('Starting AWS Queue');
      this.started = true;
      this.poll();
    }
  }

  stop(): void {
    if (!this.started) {
      debug('Router was already stopped');
      return void 0;
    }

    debug('Stopping AWS Queue');
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
      debug('Error handling message', err);
      if (err.deleteMessage) {
        await this.provider.confirmMessage(message);
      } else {
        await this.provider.messageNotProcessed(message);
      }
    }
  }

  async poll(): Promise<void> {
    if (!this.started) {
      debug('Poll was called while consumer was stopped, cancelling poll...');
      return void 0;
    }

    debug('Polling for messages');
    const messages = await this.provider.fetchMessages();
    if (messages) {
      debug(
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
