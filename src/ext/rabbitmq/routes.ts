export class RabbitMQRouter {
  handler: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.handler = new handler(clientOptions, queueName, ..._args);
    this.handler.start();
  }
}
