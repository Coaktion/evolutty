import config from '../../config';

class BullMQRouter {
  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected functionFake: any = () => {};
  queueName: string;
  handler: any;
  constructor(queueName: string, handler: any, ...args: any[]) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.queueName = queueName;
    const { connection, concurrency } = config.bullmq;
    this.handler = new handler(
      this.queueName,
      this.functionFake,
      { connection, concurrency },
      ...args
    );
  }
}

export default BullMQRouter;
