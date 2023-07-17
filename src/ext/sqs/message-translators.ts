import { AbstractMessageTranslator } from '../../message-translators';
import { MessageTranslated } from './types';

export class SNSQueueMessageTranslator extends AbstractMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    const body = JSON.parse(message.Body);
    return {
      content: JSON.parse(body.Message),
      metadata: {
        MessageId: body.MessageId,
        ReceiptHandle: body.ReceiptHandle,
        MD5OfBody: body.MD5OfBody,
        Attributes: body.Attributes,
        MessageAttributes: body.MessageAttributes,
        MD5OfMessageAttributes: body.MD5OfMessageAttributes,
        EventSource: body.EventSource,
        EventSourceARN: body.EventSourceARN,
        AwsRegion: body.AwsRegion
      }
    };
  }
}

export class SQSMessageTranslator extends AbstractMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    return {
      content: JSON.parse(message.Body),
      metadata: {
        MessageId: message.MessageId,
        ReceiptHandle: message.ReceiptHandle,
        MD5OfBody: message.MD5OfBody,
        Attributes: message.Attributes,
        MessageAttributes: message.MessageAttributes,
        MD5OfMessageAttributes: message.MD5OfMessageAttributes,
        EventSource: message.EventSource,
        EventSourceARN: message.EventSourceARN,
        AwsRegion: message.AwsRegion
      }
    };
  }
}
