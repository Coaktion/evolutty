import { Message } from 'amqplib';

import { RabbitMQMessageTranslator } from '../../../src';

describe('RabbitMQMessageTranslator', () => {
  const translator = new RabbitMQMessageTranslator();

  it('should translate and return message correctly', () => {
    const token = '123';
    const message: Message = {
      content: Buffer.from(JSON.stringify({ title: 'test' })),
      fields: {
        consumerTag: '',
        deliveryTag: 1,
        redelivered: false,
        exchange: '',
        routingKey: ''
      },
      properties: {
        contentType: '',
        contentEncoding: '',
        headers: {},
        deliveryMode: 1,
        priority: 1,
        correlationId: '',
        replyTo: '',
        expiration: '',
        messageId: '',
        timestamp: new Date(),
        type: '',
        userId: '',
        appId: '',
        clusterId: ''
      }
    };

    const expected = {
      content: { title: 'test' },
      metadata: {
        fields: message.fields,
        properties: message.properties,
        token
      }
    };

    expect(translator.translateMessage(message, token)).toEqual(expected);
  });
});
