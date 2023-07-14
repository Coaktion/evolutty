import {
  SNSQueueMessageTranslator,
  SQSMessageTranslator
} from './message-translators';

export class SQSRouter {
  queueName: string;
  handler: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.queueName = queueName;
    clientOptions.messageTranslator = new SQSMessageTranslator();
    this.handler = new handler(this.queueName, clientOptions);
    this.handler.start();
  }
}

export class SNSQueueRouter {
  queueName: string;
  handler: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    this.queueName = queueName;
    clientOptions.messageTranslator = new SNSQueueMessageTranslator();
    this.handler = new handler(this.queueName, clientOptions);
    this.handler.start();
  }
}
