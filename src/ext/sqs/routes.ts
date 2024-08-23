import { ListQueuesCommand } from '@aws-sdk/client-sqs';

import { BaseClient } from './base';
import {
  SNSQueueMessageTranslator,
  SQSMessageTranslator
} from './message-translators';
import { SQSClientOptions } from './types';

export class SQSRouter extends BaseClient {
  queueName: string;
  handler: any;
  clientOptions: SQSClientOptions;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: SQSClientOptions,
    ..._args: any[]
  ) {
    super(clientOptions);

    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    if (!clientOptions.messageTranslator) {
      clientOptions.messageTranslator = new SNSQueueMessageTranslator();

      if (clientOptions.messageSource === 'SQS') {
        clientOptions.messageTranslator = new SQSMessageTranslator();
      }
    }

    this.queueName = queueName;
    this.handler = handler;
    this.clientOptions = clientOptions;
  }

  private async handlePrefixBasedQueues(
    prefix: string,
    handler: any
  ): Promise<void> {
    const data = await this.client.send(
      new ListQueuesCommand({
        QueueNamePrefix: prefix
      })
    );

    if (!data.QueueUrls) {
      throw new Error('No queues found with prefix: ' + prefix);
    }

    for (const queueUrl of data.QueueUrls) {
      const queueHandler = new handler(queueUrl, this.clientOptions);
      queueHandler.start();
    }
  }

  public async start(): Promise<void> {
    if (this.clientOptions.prefixBasedQueues) {
      return this.handlePrefixBasedQueues(this.queueName, this.handler);
    }

    const queueHandler = new this.handler(this.queueName, this.clientOptions);
    queueHandler.start();
  }
}
