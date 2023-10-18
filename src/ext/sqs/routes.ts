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
    super(clientOptions)

    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    clientOptions.messageTranslator = new SNSQueueMessageTranslator();

    if (clientOptions.messageSource === 'SQS') {
      clientOptions.messageTranslator = new SQSMessageTranslator();
    }

    this.queueName = queueName;
    this.clientOptions = clientOptions;

    if (clientOptions.prefixBasedQueues) {
      this.handlePrefixBasedQueues(queueName, handler);
      return;
    }

    this.handler = new handler(this.queueName, clientOptions);
    this.handler.start();
  }

  private async handlePrefixBasedQueues(prefix: string, handler: any) {
    const data = await this.client.send(
      new ListQueuesCommand({
        QueueNamePrefix: prefix
      })
    )

    const urls = data.QueueUrls || [];

    for (const queueUrl of urls) {
      const queueHandler = new handler(queueUrl, this.clientOptions);
      queueHandler.start();
    }
  }
}
