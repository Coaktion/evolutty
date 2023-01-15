import AbstractProvider from './providers';

class Router {
  provider: AbstractProvider | any;
  messageTranslator: any;
  handler: any;

  constructor(provider: any, handler: any, messageTranslator: any = null) {
    this.provider = provider;
    this.messageTranslator = messageTranslator;
    this.handler = handler;
  }

  applyMessageTranslator(message: string): { content: any; metadata: object } {
    const processedMessage = { content: message, metadata: {} };
    if (!this.messageTranslator) {
      return processedMessage;
    }

    const translated = this.messageTranslator.translate(
      processedMessage.content
    );
    processedMessage.metadata = translated.metadata;
    processedMessage.content = translated.content;

    if (!processedMessage.content) {
      throw new Error('Translated message must have a content');
    }

    return processedMessage;
  }

  stop() {
    this.provider.stop();
  }
}

export default Router;
