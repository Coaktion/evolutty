import { SNSQueueMessageTranslator, SQSMessageTranslator } from '../../../src';

const message = {
  foo: 'bar'
};

const MessageSNS = {
  Type: 'Notification',
  MessageId: '12345678-1234-1234-1234-123456789012',
  TopicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
  Message: JSON.stringify(message),
  Timestamp: '2024-08-15T00:00:00.000Z',
  SignatureVersion: '1',
  Signature: 'EXAMPLEpH+..',
  SigningCertURL:
    'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-123456789012.pem',
  UnsubscribeURL:
    'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:123456789012:MyTopic:abcdef01-2345-6789-abcd-ef0123456789',
  MessageAttributes: {
    target: {
      Type: 'String',
      Value: 'wallet'
    }
  }
};

const MessageSQS = {
  MessageId: '12345678-1234-1234-1234-123456789012',
  ReceiptHandle: 'AQEBwJnKyrHigUMZj6r...',
  MD5OfBody: '7b270e59b47ff90a553787216d55d91d',
  Attributes: {
    ApproximateReceiveCount: '1',
    SentTimestamp: '1523232000000',
    SenderId: '123456789012',
    ApproximateFirstReceiveTimestamp: '1523232000001'
  },
  MessageAttributes: {
    target: {
      Type: 'String',
      Value: 'wallet'
    }
  }
};

describe('SNSQueueMessageTranslator', () => {
  it('should return a message translator object', () => {
    expect(SNSQueueMessageTranslator).toBeDefined();
  });

  it('should return a translated message for SNS', () => {
    const data = {
      ...MessageSQS,
      Body: JSON.stringify(MessageSNS)
    };
    const translatedMessage = new SNSQueueMessageTranslator();
    const response = translatedMessage.translateMessage(data);
    const { Message, ...MessageAttributes } = MessageSNS;
    expect(response).toEqual({
      content: JSON.parse(Message),
      metadata: MessageAttributes
    });
  });
});

describe('SQSMessageTranslator', () => {
  it('should return a message translator object', () => {
    expect(SQSMessageTranslator).toBeDefined();
  });

  it('should return a translated message for SQS', () => {
    const data = {
      ...MessageSQS,
      Body: JSON.stringify(message)
    };
    const translatedMessage = new SQSMessageTranslator();
    const response = translatedMessage.translateMessage(data);
    expect(response).toEqual({
      content: message,
      metadata: MessageSQS
    });
  });
});
