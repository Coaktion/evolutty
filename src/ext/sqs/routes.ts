import {
  SNSQueueMessageTranslator,
  SQSMessageTranslator
} from './message-translators';

class BaseRouter {
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
    this.handler = new handler(this.queueName, clientOptions);
    this.handler.start();
  }
}
export class SQSRouter extends BaseRouter {
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    clientOptions.messageTranslator = new SQSMessageTranslator();
    super(queueName, handler, clientOptions, ..._args);
  }
}

export class SNSQueueRouter extends BaseRouter {
  queueName: string;
  handler: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: any,
    ..._args: any[]
  ) {
    clientOptions.messageTranslator = new SNSQueueMessageTranslator();
    super(queueName, handler, clientOptions, ..._args);
  }
}
