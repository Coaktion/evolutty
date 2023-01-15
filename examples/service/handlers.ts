import { BullMQHandler } from '../../src/';

class MyHandler extends BullMQHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(content: object, metadata: object): Promise<boolean> {
    return true;
  }
}

export default MyHandler;
