import { AbstractMessageTranslator } from '../../message-translators';
import { MessageTranslated } from './types';

class BaseMessageTranslator extends AbstractMessageTranslator {
  translateMessage(content: any, body: any): MessageTranslated {
    return {
      content,
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

export class SNSQueueMessageTranslator extends BaseMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    const body = JSON.parse(message.Body);
    const content = JSON.parse(body.Message);
    return super.translateMessage(content, body);
  }
}

export class SQSMessageTranslator extends BaseMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    const content = JSON.parse(message.Body);
    return super.translateMessage(content, message);
  }
}
