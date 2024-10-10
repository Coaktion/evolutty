import logging from '../../logging';
import { AbstractMessageTranslator } from '../../message-translators';
import { timeout } from '../../utils';
import { BaseSQS } from './base';
import { SQSProvider } from './providers';
import { SQSClientOptions } from './types';

export class SQSHandler extends BaseSQS {
  readonly _name = Object.getPrototypeOf(this).constructor.name;
  provider: SQSProvider;
  messageTranslator: AbstractMessageTranslator;
  started: boolean;
  pollingWaitTimeMs: number;
  signalStop: boolean;
  constructor(queueName: string, clientOptions: SQSClientOptions) {
    super(clientOptions);
    this.provider = new SQSProvider(queueName, clientOptions);
    this.messageTranslator = clientOptions.messageTranslator;
    this.pollingWaitTimeMs = 30000;
  }

  async stop(): Promise<void> {
    this.signalStop = true;
    logging.info(`Stopping AWS Queue ${this.provider.queueName}`);
    if (process.env.NODE_ENV === 'local') {
      this.started = false;
    }
    while (this.started) {
      await timeout(10);
    }
  }

  start(): void {
    if (!this.started) {
      logging.info(`Starting AWS Queue ${this.provider.queueName}`, {
        context: this._name
      });
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
      logging.error(`Error handling message`, {
        context: this._name,
        data: content,
        stack: err.stack
      });
      if (err.deleteMessage) {
        await this.provider.confirmMessage(message);
        logging.warn('Message deleted due to error', {
          context: this._name,
          data: content
        });
      } else {
        await this.provider.messageNotProcessed(message);
      }
    }
  }

  async poll(): Promise<void> {
    if (!this.started) {
      logging.info(
        `Poll was called while consumer was stopped, cancelling poll...`,
        { context: this._name }
      );
      return void 0;
    }

    logging.info(`Polling AWS Queue ${this.provider.queueName}`);
    const messages = await this.provider.fetchMessages();
    if (messages) {
      logging.info(
        `Received ${messages.length} messages from queue ${this.provider.queueName}`,
        { context: this._name }
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
      logging.info(`AWS Queue ${this.provider.queueName} stopped`, {
        context: this._name
      });
      return void 0;
    }
    await timeout(this.pollingWaitTimeMs);
    await this.poll();
  }

  async handle(_content: object, _metada: object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
