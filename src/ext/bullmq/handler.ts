import { Worker, Job } from "bullmq";
import { BullMQMessageTranslator } from "./message-translators";


type Processor<T = any, R = any, N extends string = string> = (
  job: Job<T, R, N> | object,
  token?: string | object,
) => Promise<R>;

class BullMQHandler extends Worker {
  protected processFn: Processor;
  constructor(queueName: string, processor?: any, options: any = {}, Connection?: any) {
    super(queueName, processor, options, Connection);
  }

  protected callProcessJob(job: Job, token: string) {
    const translator = new BullMQMessageTranslator();
    const { content, metadata } = translator.translate(job, token);
    return this.handle(content, metadata);
  }
  
  async handle(content: object, metadata?: object) : Promise<boolean> {
    throw new Error("Not implemented");
  }
}

export { BullMQHandler };
