import { Job } from "bullmq";

class BullMQHandler {
    async handle(job: Job, token: string) : Promise<boolean> {
        throw new Error("Not implemented");
    }
}

export default BullMQHandler;
