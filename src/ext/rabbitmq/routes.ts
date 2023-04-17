import { RabbitMQProvider } from './provider';

export class RabbitMQRouter {
  queueName: string;
  handler: any;
  provider: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.queueName = queueName;
    this.provider = new RabbitMQProvider(this.queueName, clientOptions);
    this.handler = new handler(this.provider, ..._args);
    this.handler.start();
  }
}
