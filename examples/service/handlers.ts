import { Job } from "bullmq";
import { BullMQHandler } from "../../src/";


class MyHandler extends BullMQHandler {
    async handle(job: Job, token: string) {
        console.log(job, token);
    }
}

export default MyHandler;
