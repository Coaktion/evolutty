class SQSQueueTranslator {
    async translate(message: any): Promise< {content: object, metadata: object} > {
        const content = JSON.parse(message.Body);
        const metadata = {
            MessageId: message.MessageId,
            Attributes: message.Attributes,
            MD5OfBody: message.MD5OfBody,
            MD5OfMessageAttributes: message.MD5OfMessageAttributes,
            MessageAttributes: message.MessageAttributes,
        };

        return {content, metadata};
    }
}

export { SQSQueueTranslator };
