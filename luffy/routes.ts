import logging from "./logging";
import { AbstractMessageTranslator } from "./message-translators";
import AbstractProvider from "./providers";


class Router {
    name: string;
    provider: AbstractProvider | any;
    messageTranslator: any;
    handler: any;
    private _handlerInstance: any;
    private _errorHandler: any;

    constructor(
        provider: any,
        handler: any,
        name: string = "default",
        messageTranslator: any = null,
        errorHandler: any = null
    ) {
        this.name = name;
        if (provider instanceof AbstractProvider) {
            throw new Error("Provider must be an instance of AbstractProvider");
        }

        this.provider = provider;
        if(messageTranslator && !(messageTranslator instanceof AbstractMessageTranslator)) {
            throw new Error("Message translator must be an instance of AbstractMessageTranslator");
        }

        this.messageTranslator = messageTranslator;
        if (errorHandler && typeof errorHandler !== "function") {
            throw new Error("Error handler must be a function");
        }

        this._errorHandler = errorHandler;
        if (typeof handler === "function") {
            this.handler = handler;
            this._handlerInstance = null
        } else {
            this.handler = handler.handle;
            this._handlerInstance = handler;
        }

        if (!this.handler) {
            throw new Error("Handler must be a function or an object with a `handle` method");
        }
    }

    applyMessageTranslator(message: string): {content: any, metadata: {}} {
        let processedMessage = {content: message, metadata: {}};
        if (!this.messageTranslator) {
            return processedMessage;
        }

        let translated = this.messageTranslator.translate(processedMessage.content);
        processedMessage.metadata = translated.metadata || {};
        processedMessage.content = translated.content;

        if (!processedMessage.content) {
            throw new Error("Translated message must have a content");
        }

        return processedMessage
    }

    async deliver(rawMessage: string) {
        let message = this.applyMessageTranslator(rawMessage);
        try {
            await this.handler(message.content, message.metadata, this._handlerInstance);
            await this.provider.confirmMessage(rawMessage);
        } catch (e) {
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
