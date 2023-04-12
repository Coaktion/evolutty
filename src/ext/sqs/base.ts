import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';

import { SQSClientOptions } from './types';

export class BaseClient {
  client: SQSClient;
  constructor(clientOptions: SQSClientOptions) {
    this.client = new SQSClient(clientOptions);
  }

  stop() {
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
