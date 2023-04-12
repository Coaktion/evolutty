import { SQSProvider } from '../../../src';

jest.mock('@aws-sdk/client-sqs');

describe('SQSProvider', () => {
  let sqsProvider: SQSProvider;
  beforeEach(() => {
    jest.clearAllMocks();
    sqsProvider = new SQSProvider('queueName', { visibilityTimeout: 30 });
  });

  it('should be defined', () => {
    expect(sqsProvider).toBeDefined();
  });

  it('should have a queueName', () => {
    expect(sqsProvider.queueName).toEqual('queueName');
  });

  it('should have a clientOptions', () => {
    expect(sqsProvider.clientOptions).toEqual({ visibilityTimeout: 30 });
  });

  it('should have a client', () => {
    expect(sqsProvider.client).toBeDefined();
  });

  it('should delete a message when confirmMessage is called', async () => {
    const message = {
      ReceiptHandle: 'receiptHandle'
    };
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockResolvedValue('result');
    const result = await sqsProvider.confirmMessage(message);
    expect(result).toEqual('result');
  });

  it('should not delete a message when confirmMessage is called and the message does not exist', async () => {
    const message = {
      ReceiptHandle: 'receiptHandle'
    };
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockRejectedValue({
      response: {
        status: 404
      }
    });
    const result = await sqsProvider.confirmMessage(message);
    expect(result).toEqual(undefined);
  });

  it('should throw an error when confirmMessage is called and the message does not exist', async () => {
    const message = {
      ReceiptHandle: 'receiptHandle'
    };
    const responseError = {
      response: {
        status: 500
      }
    };

    try {
      sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
      sqsProvider.client.client.send = jest
        .fn()
        .mockRejectedValue(responseError);
      await sqsProvider.confirmMessage(message);
    } catch (error) {
      expect(error).toEqual(responseError);
    }
  });

  it('should not change the visibility timeout when messageNotProcessed is called and backoffFactor is not set', async () => {
    const message = {
      Attributes: {
        ApproximateReceiveCount: '1'
      },
      ReceiptHandle: 'receiptHandle'
    };
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockResolvedValue('result');
    const result = await sqsProvider.messageNotProcessed(message);
    expect(result).toEqual(undefined);
  });

  it('should change the visibility timeout when messageNotProcessed is called and backoffFactor is set', async () => {
    const message = {
      Attributes: {
        ApproximateReceiveCount: '1'
      },
      ReceiptHandle: 'receiptHandle'
    };
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockResolvedValue('result');
    sqsProvider.clientOptions.backoffFactor = 2;
    const result = await sqsProvider.messageNotProcessed(message);
    expect(result).toEqual('result');
  });

  it('should resolve when messageNotProcessed is called and InvalidParameterValue error is thrown', async () => {
    const message = {
      Attributes: {
        ApproximateReceiveCount: '1'
      },
      ReceiptHandle: 'receiptHandle'
    };
    sqsProvider.clientOptions.backoffFactor = 2;
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockRejectedValue({
      name: 'Invalid'
    });
    const response = await sqsProvider.messageNotProcessed(message);
    expect(response).toEqual(undefined);
  });

  it('should throw an error when messageNotProcessed is called and an error is thrown', async () => {
    const message = {
      Attributes: {
        ApproximateReceiveCount: '1'
      },
      ReceiptHandle: 'receiptHandle'
    };
    const responseError = {
      name: 'InvalidParameterValue'
    };
    try {
      sqsProvider.clientOptions.backoffFactor = 2;
      sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
      sqsProvider.client.client.send = jest
        .fn()
        .mockRejectedValue(responseError);
      await sqsProvider.messageNotProcessed(message);
    } catch (error) {
      expect(error).toEqual(responseError);
    }
  });

  it('should messages when fetchMessages is called', async () => {
    const messages = [
      {
        Body: 'message1'
      },
      {
        Body: 'message2'
      }
    ];
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockResolvedValue({
      Messages: messages
    });
    const result = await sqsProvider.fetchMessages();
    expect(result).toEqual(messages);
  });

  it('should return an empty array when fetchMessages is called and no messages are returned', async () => {
    sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
    sqsProvider.client.client.send = jest.fn().mockResolvedValue({
      Messages: []
    });
    const result = await sqsProvider.fetchMessages();
    expect(result).toEqual([]);
  });

  it('should throw an error when fetchMessages is called and an error is thrown', async () => {
    const responseError = {
      name: 'InvalidParameterValue'
    };
    try {
      sqsProvider.client.queueUrl = jest.fn().mockResolvedValue('queueUrl');
      sqsProvider.client.client.send = jest
        .fn()
        .mockRejectedValue(responseError);
      await sqsProvider.fetchMessages();
    } catch (error) {
      expect(error).toEqual(responseError);
    }
  });

  it('should stop provider when stop is called', async () => {
    sqsProvider.client.stop = jest.fn().mockResolvedValue(undefined);
    const result = await sqsProvider.stop();
    expect(result).toEqual(undefined);
    expect(sqsProvider.client.stop).toHaveBeenCalled();
  });
});
