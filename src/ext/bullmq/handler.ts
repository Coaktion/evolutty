import { Worker } from "bullmq";
import config from "../../config";

class BullMQHandler {
    queueName: any;
    worker: Worker<any, any, string>;
    constructor(queueName: any) {
        const connection = config.bullmq.connection;
        this.queueName = queueName || "default";
        this.worker = new Worker(this.queueName, this.handle, {connection});
    }
    
    async handle(message: any) {
        throw new Error("Not implemented");
    }
}

export default BullMQHandler;
