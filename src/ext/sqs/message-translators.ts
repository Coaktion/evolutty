import { AbstractMessageTranslator } from '../../message-translators';
import { MessageTranslated } from './types';

abstract class BaseMessageTranslator extends AbstractMessageTranslator {
  translateMessage(content: any, metadata: any): MessageTranslated {
    return {
      content: JSON.parse(content),
      metadata
    };
  }
}
export class SNSQueueMessageTranslator extends BaseMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    const body = JSON.parse(message.Body);
    const { Message, ...MessageAttributes } = body;
    return super.translateMessage(Message, MessageAttributes);
  }
}

export class SQSMessageTranslator extends BaseMessageTranslator {
  translateMessage(message: any): MessageTranslated {
    const { Body, ...MessageAttributes } = message;
    return super.translateMessage(Body, MessageAttributes);
  }
}
