import { ConsumerOptions } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";
import config from "../../config";
import { SQSQueueHandler } from "./handlers";


class SQSQueueRouter {
    queueName: string;
    queueUrl: string;
    options: ConsumerOptions;
    constructor(
        queueName: string,
        handler: SQSQueueHandler | any,
        ...args: any[]
    ) {
        if (!queueName) {
            throw new Error("Queue name must be provided");
        }

        this.queueUrl = `https://sqs.${ config.sqs.region }.amazonaws.com/${ config.sqs.accountNumber }/${ queueName }`;
        if (config.sqs.endpointUrl) {
            this.queueUrl = `${config.sqs.endpointUrl}//${ config.sqs.accountNumber }/${queueName}`;
        }


        this.options = {
            queueUrl: this.queueUrl,
            region: config.sqs.region,
            attributeNames: ['All'],
            messageAttributeNames: ['All'],
            batchSize: config.sqs.batchSize,
            visibilityTimeout: config.sqs.visibilityTimeout,
            waitTimeSeconds: config.sqs.waitTimeSeconds,
            authenticationErrorTimeout: config.sqs.authenticationErrorTimeout,
            sqs: new SQSClient({
                region: config.sqs.region,
                endpoint: config.sqs.endpointUrl || undefined,
                credentials: {
                    accessKeyId: config.sqs.accessKeyId,
                    secretAccessKey: config.sqs.secretAccessKey,
                },
            }),
        };

        const consumer = handler.create(this.options);
        consumer.start();
    }
}

export { SQSQueueRouter };
