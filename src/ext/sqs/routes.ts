export class SQSRouter {
  queueName: string;
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

    this.queueName = queueName;
    this.handler = new handler(this.queueName, clientOptions);
  }
}
