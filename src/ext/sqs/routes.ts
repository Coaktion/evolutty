import { ListQueuesCommand } from '@aws-sdk/client-sqs';

import { BaseClient } from './base';
import {
  SNSQueueMessageTranslator,
  SQSMessageTranslator
} from './message-translators';
import { SQSClientOptions } from './types';

const mapperTranslator = {
  SNS: SNSQueueMessageTranslator,
  SQS: SQSMessageTranslator,
  undefined: SNSQueueMessageTranslator
};

export class SQSRouter extends BaseClient {
  queueName: string;
  handler: any;
  clientOptions: SQSClientOptions;
  instances = [];
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
      clientOptions.messageTranslator = new mapperTranslator[
        clientOptions.messageSource
      ]();
    }

    this.queueName = queueName;
    this.handler = handler;
    this.clientOptions = clientOptions;

    process.on('SIGINT', this.stop.bind(this));
    process.on('SIGTERM', this.stop.bind(this));
  }

  async stop(): Promise<void> {
    await Promise.all(this.instances.map((instance) => instance.stop()));
    await super.stop();
    process.exit();
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
      this.instances.push(queueHandler);
      queueHandler.start();
    }
  }

  public async start(): Promise<void> {
    if (this.clientOptions.prefixBasedQueues) {
      return this.handlePrefixBasedQueues(this.queueName, this.handler);
    }

    const queueHandler = new this.handler(this.queueName, this.clientOptions);
    this.instances.push(queueHandler);
    queueHandler.start();
  }
}
