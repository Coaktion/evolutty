import { Message } from 'amqplib';

import { TranslateRabbitMQ } from './types';

export class RabbitMQMessageTranslator {
  translateMessage(message: Message, token: string): TranslateRabbitMQ {
    return {
      content: JSON.parse(message.content.toString()),
      metadata: {
        fields: message.fields,
        properties: message.properties,
        token
      }
    };
  }
}
