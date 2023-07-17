import { Job, Worker } from 'bullmq';

import { BullMQMessageTranslator } from './message-translators';
import { TranslateBullMQ } from './types';

class BullMQHandler extends Worker {
  constructor(
    queueName: string,
    processor?: any,
    options?: any,
    Connection?: any
  ) {
    super(queueName, processor, options, Connection);
  }

  /**
   * @description
   * This method is called by the BullMQ Worker when a job is received.
   * It is called by the BullMQ Worker, not by the application.
   * @param {Job} job
   * @param {string} token
   * @returns {Promise<boolean>}
   * @memberof BullMQHandler
   */
  protected callProcessJob(job: Job, token: string) {
    const translator = new BullMQMessageTranslator();
    const { content, metadata } = translator.translateMessage(job, token);
    return this.handle({ content, metadata });
  }

  /**
   * Method to be implemented by the application
   * @param {TranslateBullMQ["content"]} content
   * @param {TranslateBullMQ["content"]} metadata
   * @returns {Promise<boolean>} - Return `true` if the message was processed successfully
   * @memberof BullMQHandler
   * @description
   * This method is called by the BullMQ Worker when a job is received.
   * It is called by the BullMQ Worker, not by the application.
   * @example
   * async handle(content: Translate["content"], metadata?: Translate["content"]): Promise<boolean> {
   *  // messagem processing logic
   *  return true;
   * }
   */
  async handle(
    _content: TranslateBullMQ['content'],
    _metadata?: TranslateBullMQ['metadata']
  ): Promise<boolean> {
    throw new Error('Not implemented');
  }
}

export { BullMQHandler };
