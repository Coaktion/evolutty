import { SQSHandler } from '../../src/';

export class MyHandler extends SQSHandler {
  async handle(content: object, metadata: object): Promise<boolean> {
    console.log('content', content);
    console.log('metadata', metadata);
    return true;
  }
}
