import { Worker } from "bullmq";
import config from "../../config";

class BullMQRouter {
    queueName: string;
    constructor(
        queueName: string,
        handler: any,
        ...args: any[]
    ) {
        if (!queueName) {
            throw new Error("Queue name must be provided");
        }

        this.queueName = queueName;
        const {connection, concurrency} = config.bullmq;
        const instanceHandler = new handler();
        new Worker(queueName, instanceHandler.handle, {connection, concurrency});
    }
}


export default BullMQRouter;
