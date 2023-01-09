import { Worker } from "bullmq";

class BullMQHandler {
    queueName: any;
    worker: Worker<any, any, string>;
    constructor(queueName: any) {
        this.queueName = queueName || "default";
        this.worker = new Worker(this.queueName, this.handle);
    }
    
    async handle(message: any) {
        throw new Error("Not implemented");
    }
}

export default BullMQHandler;
