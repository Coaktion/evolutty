import { debug } from 'console';

import { BaseSQS } from './base';
import { SQSMessageTranslator } from './message-translators';
import { SQSProvider } from './providers';
import { SQSClientOptions } from './types';

export class SQSHandler extends BaseSQS {
  provider: SQSProvider;
  messageTranslator: SQSMessageTranslator;
  started: boolean;
  pollingTimeoutId: NodeJS.Timeout | undefined = undefined;
  pollingWaitTimeMs: number;
  constructor(queueName: string, clientOptions: SQSClientOptions) {
    super(clientOptions);
    this.provider = new SQSProvider(queueName, clientOptions);
    this.messageTranslator = new SQSMessageTranslator();
    this.pollingWaitTimeMs = 1000;
    this.start();
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

    if (this.pollingTimeoutId) {
      clearTimeout(this.pollingTimeoutId);
      this.pollingTimeoutId = undefined;
    }
  }

  poll(): void {
    if (!this.started) {
      debug('Poll was called while consumer was stopped, cancelling poll...');
      return;
    }

    debug('Polling for messages');
    this.provider.fetchMessages().then((messages: any[]) => {
      if (messages) {
        debug(`Received ${messages.length} messages`);
        messages.forEach((message: any) => {
          const { content, metadata } =
            this.messageTranslator.translateMessage(message);
          this.handle(content, metadata)
            .then((handled: boolean) => {
              if (handled) {
                this.provider.confirmMessage(message);
              }
            })
            .catch((err: any) => {
              debug('Error handling message', err);
              if (err.deleteMessage) {
                this.provider.confirmMessage(message);
              } else {
                this.provider.messageNotProcessed(message);
              }
            });
        });
      }

      if (this.pollingTimeoutId) {
        clearTimeout(this.pollingTimeoutId);
      }
      this.pollingTimeoutId = setTimeout(() => {
        this.poll();
      }, this.pollingWaitTimeMs);
    });
  }

  async handle(_content: object, _metada: object): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
