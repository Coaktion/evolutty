class AbstractProvider {
    async fetchMessages(): Promise<object[]> {
        /**
         * Returns a list of messages from the provider.
         * if not messages are available, returns an empty list.
         */
        throw new Error("Method not implemented.");
    }

    async confirmMessage(message: object) {
        /**
         * Confirm a message as processed.
         * After the message confirmation we should not receive the same message again.
         * This usually means we need to delete the message in the provider.
         */
        throw new Error("Method not implemented.");
    }

    async messageNotProcessed(message: object) {
        /**
         * Perform actions when a message was not processed.
         */
        throw new Error("Method not implemented.");
    }

    stop() {
        /**
         * Stop the provider.
         * If needed, this method should close the connection with the provider.
         */
        throw new Error("Method not implemented.");
    }
}

export default AbstractProvider;
