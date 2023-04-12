import { AbstractMessageTranslator } from '../../message-translators';
import { MessageTranslated } from './types';

export class SQSMessageTranslator extends AbstractMessageTranslator {
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
