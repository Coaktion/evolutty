import { Job } from 'bullmq';

import { AbstractMessageTranslator } from '../../message-translators';
import { TranslateBullMQ } from './types';

export class BullMQMessageTranslator extends AbstractMessageTranslator {
  translate(job: Job, token: string): TranslateBullMQ {
    return {
      content: job.data,
      metadata: {
        id: job.id,
        name: job.name,
        timestamp: job.timestamp,
        opts: job.opts,
        job,
        token
      }
    };
  }
}
