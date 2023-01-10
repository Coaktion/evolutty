import BullMQHandler from "../../src/ext/bullmq/handler";

class MyHandler extends BullMQHandler {
    constructor(queueName: string) {
        super(queueName);
    }

    async handle(message: any) {
        console.log(message);
    }
}

export default MyHandler;
