import { Job } from "bullmq";
import { BullMQHandler } from "../../src/";


class MyHandler extends BullMQHandler {
    async handle(job: Job, token: string): Promise<boolean> {
        console.log(job, token);
        return true;
    }
}

export default MyHandler;
