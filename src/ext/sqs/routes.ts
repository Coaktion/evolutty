import {
  SNSQueueMessageTranslator,
  SQSMessageTranslator
} from './message-translators';
import { SQSClientOptions } from './types';

export class SQSRouter {
  queueName: string;
  handler: any;
  constructor(
    queueName: string,
    handler: any,
    clientOptions: SQSClientOptions,
    ..._args: any[]
  ) {
    if (!queueName) {
      throw new Error('Queue name must be provided');
    }

    if (!clientOptions.messageSource) {
      clientOptions.messageSource = 'SNS';
    }

    if (clientOptions.messageSource === 'SNS') {
      clientOptions.messageTranslator = new SNSQueueMessageTranslator();
    }

    if (clientOptions.messageSource === 'SQS') {
      clientOptions.messageTranslator = new SQSMessageTranslator();
    }

    this.queueName = queueName;
    this.handler = new handler(this.queueName, clientOptions);
    this.handler.start();
  }
}
