import { Worker, Job } from 'bullmq';
import { BullMQMessageTranslator } from './message-translators';

class BullMQHandler extends Worker {
  constructor(
    queueName: string,
    processor?: any,
    options?: any,
    Connection?: any
  ) {
    super(queueName, processor, options, Connection);
  }

  protected callProcessJob(job: Job, token: string) {
    const translator = new BullMQMessageTranslator();
    const { content, metadata } = translator.translate(job, token);
    return this.handle(content, metadata);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(content: object, _metadata?: object): Promise<boolean> {
    throw new Error('Not implemented');
  }
}

export { BullMQHandler };
