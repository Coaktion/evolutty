import config from '../../config';

class BullMQRouter {
  /* istanbul ignore next */
  protected functionFake: any = () => {};
  queueName: string;
  handler: any;
  constructor(queueName: string, handler: any) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.queueName = queueName;
    this.handler = handler;
  }

  async start() {
    const { connection, concurrency } = config.bullmq;
    this.handler = new this.handler(
      this.queueName,
      this.functionFake,
      { connection, concurrency }
    );
  }
}

export default BullMQRouter;
