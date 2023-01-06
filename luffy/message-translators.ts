import logging from "./logging";


class AbstractMessageTranslator {
    translate(message: string): object {
        /**
         * Translate a given message to an appropriate format to message processing
         * This method should return a `object` instance with two keys: `content` and `metadata`.
         * The `content` should contain the translated message and, `metadata` a
         * object with translation metadata or an empty `json` object.
        */
        throw new Error("Method not implemented.");
    }
}


class StringMessageTranslator extends AbstractMessageTranslator {
    translate(message: string): object {
        logging.debug("Translating message to string");
        return {
            content: message,
            metadata: {},
        };
    }
}

export { AbstractMessageTranslator, StringMessageTranslator };
