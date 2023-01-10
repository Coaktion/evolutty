import { Queue } from "bullmq";
import AbstractProvider from "../../providers";
import logging from "../../logging";
import config from "../../config";

export default class BullMQProvider extends AbstractProvider {
    provider: Queue<any, any, string>;
    queueName: string;
    constructor(
        queueName: string,
        ...args: any[]
    ) {
        super();
        const connection = config.bullmq.connection;
        this.provider = new Queue(queueName, {connection});
        this.queueName = queueName;
    }

    async fetchMessages() {
        logging.info(`Fetching messages from BullMQ, queueName=${this.queueName}`);
        const jobs = await this.provider.getJobs(["completed"]);
        return jobs;
    }

    async confirmMessage(message: any) {
        logging.info(`Confirming message (ack/deletion), messageId=${message.id}`);
        await this.provider.remove(message.id);
    }

    async messageNotProcessed(message: any) {
        await this.provider.remove(message.id);
    }

    stop() {
        this.provider.close();
    }
}
