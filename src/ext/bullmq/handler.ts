import { Job } from "bullmq";

class BullMQHandler {
    async handle(job: Job, token: string) {
        throw new Error("Not implemented");
    }
}

export default BullMQHandler;
