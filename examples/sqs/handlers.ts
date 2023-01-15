import { SQSQueueHandler } from '../../src';


class MyHandler extends SQSQueueHandler {
    async handle(content: object, metadata: object): Promise<boolean> {
        console.log(content, metadata);
        return true;
    }
}

export default MyHandler;
