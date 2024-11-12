import { AbstractMessageTranslator } from '../../message-translators';
import { timeout } from '../../utils';
import { BaseSQS } from './base';
import { DEFAULT_WAIT_TIME_POLLING } from './constants';
import { SQSProvider } from './providers';
import { SQSClientOptions } from './types';

export class SQSHandler extends BaseSQS {
  provider: SQSProvider;
  messageTranslator: AbstractMessageTranslator;
  started: boolean;
  pollingWaitTimeMs: number;
  signalStop: boolean;
  constructor(queueName: string, clientOptions: SQSClientOptions) {
    super(clientOptions);
    this.provider = new SQSProvider(queueName, clientOptions);
    this.messageTranslator = clientOptions.messageTranslator;
    this.pollingWaitTimeMs =
      clientOptions.waitTimePolling || DEFAULT_WAIT_TIME_POLLING;
  }

  async stop(): Promise<void> {
    this.signalStop = true;
    this.info(`Stopping AWS Queue ${this.provider.queueName}`);
    if (process.env.NODE_ENV === 'local') {
      this.started = false;
    }
    while (this.started) {
      await timeout(10);
    }
  }

  start(): void {
    if (!this.started) {
      this.info(`Starting AWS Queue ${this.provider.queueName}`);
      this.started = true;
      this.signalStop = false;
      this.poll();
    }
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
      this.error(`Error handling message`, {
        data: content,
        stack: err.stack
      });
      if (err.deleteMessage) {
        await this.provider.confirmMessage(message);
        this.warn('Message deleted due to error', {
          data: content
        });
      } else {
        await this.provider.messageNotProcessed(message);
      }
    }
  }

  async poll(): Promise<void> {
    if (!this.started) {
      this.info(
        `Poll was called while consumer was stopped, cancelling poll...`
      );
      return void 0;
    }

    this.info(`Polling AWS Queue ${this.provider.queueName}`);
    const messages = await this.provider.fetchMessages();
    if (messages) {
      this.info(
        `Received ${messages.length} messages from queue ${this.provider.queueName}`
      );
      const promises = messages.map((message: any) =>
        this.processMessage(message)
      );
      await Promise.all(promises);
    }

    await this.callPoll();
  }

  async callPoll(): Promise<void> {
    if (this.signalStop) {
      this.started = false;
      this.info(`AWS Queue ${this.provider.queueName} stopped`);
      return void 0;
    }
    await timeout(this.pollingWaitTimeMs);
    await this.poll();
  }

  async handle(_content: object, _metada: object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
