import { Consumer, ConsumerOptions } from "sqs-consumer";
import { SQSQueueTranslator } from "./message-translators";
import { Message } from "@aws-sdk/client-sqs";

class SQSQueueHandler extends Consumer {
    constructor(options: ConsumerOptions) {
        super(options);
    }

    async handle(content: object, metadata: object): Promise<boolean> {
        return true;
    }

    static create(options: ConsumerOptions): SQSQueueHandler {
        options.handleMessage = async (message: Message): Promise<any> => {
            const translator = new SQSQueueTranslator();
            const { content, metadata } = await translator.translate(message);
            const result = await this.prototype.handle(content, metadata);
            if (result) {
                return message;
            }
            return;
        };

        options.handleMessageBatch = undefined;
        return new SQSQueueHandler(options);
    }

}

export { SQSQueueHandler };
