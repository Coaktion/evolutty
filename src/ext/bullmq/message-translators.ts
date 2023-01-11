import { AbstractMessageTranslator } from "../../message-translators";
import { Job } from "bullmq";

export class BullMQMessageTranslator extends AbstractMessageTranslator {
  translate(job: Job, token: string): {content: object, metadata: object} {
    return {
      content: job.data,
      metadata: {
        id: job.id,
        name: job.name,
        timestamp: job.timestamp,
        opts: job.opts,
        job: job,
        token: token
      }
    };
  }
}

