import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';

import { SQSClientOptions } from '../../../src';
import { BaseClient, BaseSQS } from '../../../src/ext/sqs/base';

jest.mock('@aws-sdk/client-sqs');

describe('BaseClient', () => {
  let client: BaseClient;

  const clientOptions: SQSClientOptions = {
    region: 'us-east-1',
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY'
  };

  beforeEach(() => {
    client = new BaseClient(clientOptions);
  });

  it('should instantiate the SQSClient with the provided options', () => {
    expect(SQSClient).toHaveBeenCalledTimes(1);
    expect(SQSClient).toHaveBeenCalledWith(clientOptions);
  });

  it('should stop the SQS client', () => {
    const destroySpy = jest.spyOn(client.client, 'destroy');
    client.stop();
    expect(destroySpy).toHaveBeenCalledTimes(1);
  });
});

describe('BaseSQS', () => {
  it.each([
    ['http://localhost:4566/test-queue', 'http://localhost:4566/test-queue'],
    [
      'test-queue',
      'https://sqs.us-east-1.amazonaws.com/123456789012/test-queue'
    ]
  ])(
    'should return the correct queue URL with queueName %s',
    async (queueName, expectedURL) => {
      const clientOptions = {
        region: 'us-east-1'
      };
      const baseSQS = new BaseSQS(clientOptions);
      baseSQS.client.send = jest
        .fn()
        .mockResolvedValue({ QueueUrl: expectedURL });
      const result = await baseSQS.queueUrl(queueName);
      expect(result).toEqual(expectedURL);

      if (queueName === 'test-queue') {
        expect(GetQueueUrlCommand).toHaveBeenCalledWith({
          QueueName: 'test-queue'
        });
      }
    }
  );
});
