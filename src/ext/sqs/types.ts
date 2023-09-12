import { AbstractMessageTranslator } from '@/message-translators';

import { SNSQueueMessageTranslator } from './message-translators';

export type SQSClientOptions = {
  apiVersion?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
  endpoint?: string;
  region?: string;
  messageTranslator?: AbstractMessageTranslator;
  useSSL?: boolean;
  verifySSL?: boolean;
  backoffFactor?: number;
  visibilityTimeout?: number;
};

export type SQSMessageAttributes = {
  [key: string]: {
    DataType: string;
    StringValue: string;
    BinaryValue: Buffer;
  };
};

export type MetaData = {
  MessageId: string;
  ReceiptHandle: string;
  MD5OfBody: string;
  Attributes: object;
  MessageAttributes?: SQSMessageAttributes;
  MD5OfMessageAttributes: string;
  EventSource: string;
  EventSourceARN: string;
  AwsRegion: string;
};

export type Message = MetaData & {
  Body: string;
};

export type MessageTranslated = {
  content: object;
  metadata: MetaData;
};

export type ProviderOptions = {
  handler: (message: MessageTranslated) => Promise<void>;
  messageTranslator?: SNSQueueMessageTranslator;
};
