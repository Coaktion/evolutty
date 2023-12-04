import { RabbitMQClientOptions } from "./types";

export class RabbitMQRouter {
  handler: any;
  queueName: string;
  clientOptions: RabbitMQClientOptions;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.clientOptions = clientOptions;
    this.queueName = queueName;
    this.handler = handler;
  }

  async start() {
    this.handler = new this.handler(this.clientOptions, this.queueName);
    this.handler.start();
  }
}
