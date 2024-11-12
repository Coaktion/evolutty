import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';

import { LoggerService } from '../../logging';
// Replace with the actual path to LoggerService
import { SQSClientOptions } from './types';

export class BaseClient extends LoggerService {
  client: SQSClient;
  constructor(clientOptions: SQSClientOptions) {
    super();
    this.client = new SQSClient(clientOptions);
  }

  async stop() {
    this.client.destroy();
  }
}

export class BaseSQS extends BaseClient {
  private _cached_queue_urls: object;
  clientOptions: SQSClientOptions;
  constructor(clientOptions: SQSClientOptions) {
    super(clientOptions);
    this._cached_queue_urls = {};
    this.clientOptions = clientOptions;
  }

  async queueUrl(queueName: string): Promise<string> {
    if (
      queueName &&
      (queueName.startsWith('http://') || queueName.startsWith('https://'))
    ) {
      const name = queueName.split('/').pop();
      this._cached_queue_urls[queueName] = queueName;
      queueName = name;
    }

    if (!this._cached_queue_urls[queueName]) {
      const data = await this.client.send(
        new GetQueueUrlCommand({ QueueName: queueName })
      );
      this._cached_queue_urls[queueName] = data.QueueUrl;
    }

    return this._cached_queue_urls[queueName];
  }
}
