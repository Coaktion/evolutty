import { logging } from '../../src';
import { SQSHandler } from '../../src/ext/sqs/handlers';

export class MyHandler extends SQSHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    logging.info(content);
    return true;
  }
}
