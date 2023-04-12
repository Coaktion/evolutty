export interface Provider {
  fetchMessages(): Promise<object[]>;
  confirmMessage(message: object): Promise<any>;
  messageNotProcessed(message: object): Promise<any>;
  stop(): void;
}

export interface MessageTranslator {
  translate(message: any, ...args: any): object;
}

export interface MessageHandler {
  handle(message: any): Promise<boolean>;
}
