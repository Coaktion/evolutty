import BullMQHandler from "../../luffy/ext/bullmq/handler";

class MyHandler extends BullMQHandler {
    constructor(queueName: string) {
        super(queueName);
    }

    async handle(message: any) {
        console.log(message);
    }
}

export default MyHandler;
