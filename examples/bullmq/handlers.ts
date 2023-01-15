import { BullMQHandler } from "../../src";


class MyHandler extends BullMQHandler {
    async handle(content: object, metadata: object): Promise<boolean> {
        console.log(content, metadata);
        return true;
    }
}

export default MyHandler;
