import { SQSMessageTranslator } from '../../../src';

describe('SQSMessageTranslator', () => {
  const translator = new SQSMessageTranslator();

  it('should translate message correctly', () => {
    const message = {
      Body: JSON.stringify({
        MessageId: '123',
        Message: JSON.stringify({ foo: 'bar' }),
        ReceiptHandle: '321',
        MD5OfBody: 'abc',
        Attributes: {},
        MessageAttributes: {},
        MD5OfMessageAttributes: '',
        EventSource: '',
        EventSourceARN: '',
        AwsRegion: ''
      })
    };

    const expected = {
      content: { foo: 'bar' },
      metadata: {
        MessageId: '123',
        ReceiptHandle: '321',
        MD5OfBody: 'abc',
        Attributes: {},
        MessageAttributes: {},
        MD5OfMessageAttributes: '',
        EventSource: '',
        EventSourceARN: '',
        AwsRegion: ''
      }
    };

    expect(translator.translateMessage(message)).toEqual(expected);
  });
});
