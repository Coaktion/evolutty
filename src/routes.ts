import logging from "./logging";
import AbstractProvider from "./providers";


class Router {
    provider: AbstractProvider | any;
    messageTranslator: any;
    handler: Function;
    private _handlerInstance: Function;
    private _errorHandler: Function;

    constructor(
        provider: any,
        handler: any,
        messageTranslator: any = null,
        errorHandler: any = null
    ) {
        this.provider = provider;
        this.messageTranslator = messageTranslator;
        this._errorHandler = errorHandler;
        
        if (typeof handler === "function") {
            this.handler = handler;
            this._handlerInstance = null;
        } else {
            this.handler = handler.handle;
            this._handlerInstance = handler;
        }

        if (!this.handler) {
            throw new Error("Handler must be a function or an object with a `handle` method");
        }
    }

    applyMessageTranslator(message: string): {content: any, metadata: object} {
        const processedMessage = {content: message, metadata: {}};
        if (!this.messageTranslator) {
            return processedMessage;
        }

        const translated = this.messageTranslator.translate(processedMessage.content);
        processedMessage.metadata = translated.metadata || {};
        processedMessage.content = translated.content;

        if (!processedMessage.content) {
            throw new Error("Translated message must have a content");
        }

        return processedMessage;
    }

    async deliver(rawMessage: string) {
        const message = this.applyMessageTranslator(rawMessage);
        try {
            await this.handler(message.content, message.metadata, this._handlerInstance);
            await this.provider.confirmMessage(rawMessage);
        } catch (e: any) {
            logging.error(`Error while processing message: ${e}`);
            if (this.errorHandler) {
                await this.errorHandler(e, rawMessage);
            }
            await this.provider.messageNotProcessed(rawMessage);
        }
    }

    async errorHandler(e: Error, rawMessage: string) {
        logging.error(`Error while processing message: ${e}`);
        if (this._errorHandler) {
            await this._errorHandler(e, rawMessage);
        }
        await this.provider.messageNotProcessed(rawMessage);
    }

    stop() {
        this.provider.stop();
    }
}

export default Router;
