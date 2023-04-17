import { RabbitMQHandler } from '../../src/ext/rabbitmq/handler';

export class MyHandler extends RabbitMQHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    console.log('content', content);
    return true;
  }
}
