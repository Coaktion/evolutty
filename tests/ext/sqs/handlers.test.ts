import { SQSHandler, SQSMessageTranslator, SQSProvider } from '../../../src';

describe('SQSHandler', () => {
  let sqsHandler: SQSHandler;

  beforeEach(() => {
    sqsHandler = new SQSHandler('queueName', {
      visibilityTimeout: 10,
      messageTranslator: new SQSMessageTranslator()
    });
  });

  describe('constructor', () => {
    it('should create a new SQSHandler', () => {
      expect(sqsHandler).toBeDefined();
      expect(sqsHandler.provider).toBeDefined();
      expect(sqsHandler.provider).toBeInstanceOf(SQSProvider);
      expect(sqsHandler.messageTranslator).toBeDefined();
      expect(sqsHandler.messageTranslator).toBeInstanceOf(SQSMessageTranslator);
    });
  });

  describe('start', () => {
    it('should start the handler', () => {
      sqsHandler.poll = jest.fn();
      sqsHandler.start();
      expect(sqsHandler.started).toBeTruthy();
      expect(sqsHandler.poll).toHaveBeenCalled();
    });
  });

  describe('stop', () => {
    it('should stop the handler', () => {
      sqsHandler.started = true;
      sqsHandler.stop();
      expect(sqsHandler.started).toBeTruthy();
      expect(sqsHandler.signalStop).toBeTruthy();
    });

    it('should not stop the handler if it is already stopped', () => {
      sqsHandler.started = false;
      sqsHandler.stop();
      expect(sqsHandler.started).toBeFalsy();
    });

    it('should stop the handler if the environment is local', () => {
      process.env.NODE_ENV = 'local';
      sqsHandler.started = true;
      sqsHandler.stop();
      expect(sqsHandler.started).toBeFalsy();
    });
  });

  describe('processMessage', () => {
    it('should process the message', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockResolvedValue(true);
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({ content, metadata });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).toHaveBeenCalledWith(message);
    });

    it('should process the message and not confirm it', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockResolvedValue(false);
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({ content, metadata });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).not.toHaveBeenCalled();
    });

    it('should process the message and not confirm it if the message is not handled', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockRejectedValue({ deleteMessage: true });
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({ content, metadata });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).toHaveBeenCalledWith(message);
    });

    it('should process the message and not confirm it if the message is not handled', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockRejectedValue({ delete: true });
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({
          content,
          metadata
        });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).not.toHaveBeenCalledWith(
        message
      );
    });

    it('should process the message and not confirm it if the message is not handled', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockRejectedValue({ deleteMessage: true });
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({
          content,
          metadata
        });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).toHaveBeenCalledWith(message);
    });

    it('should process the message and not confirm it if the message is not handled', async () => {
      const message = {
        Body: 'message',
        ReceiptHandle: 'receiptHandle'
      };
      const content = 'content';
      const metadata = 'metadata';
      sqsHandler.handle = jest.fn().mockRejectedValue({ deleteMessage: true });
      sqsHandler.provider.confirmMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.messageTranslator.translateMessage = jest
        .fn()
        .mockReturnValue({
          content,
          metadata
        });
      await sqsHandler.processMessage(message);
      expect(sqsHandler.handle).toHaveBeenCalledWith(content, metadata);
      expect(sqsHandler.provider.confirmMessage).toHaveBeenCalledWith(message);
    });
  });

  describe('poll', () => {
    it('should poll the queue and not process the message', async () => {
      sqsHandler.started = false;
      sqsHandler.processMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.provider.fetchMessages = jest.fn().mockResolvedValue({
        Messages: [
          {
            Body: 'message',
            ReceiptHandle: 'receiptHandle'
          }
        ]
      });
      await sqsHandler.poll();
      expect(sqsHandler.processMessage).not.toHaveBeenCalled();
    });

    it('should poll the queue and process the message', async () => {
      sqsHandler.started = true;
      sqsHandler.callPoll = jest.fn().mockResolvedValue(true);
      sqsHandler.processMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.provider.fetchMessages = jest.fn().mockResolvedValue([
        {
          Body: 'message',
          ReceiptHandle: 'receiptHandle'
        }
      ]);
      await sqsHandler.poll();
      expect(sqsHandler.processMessage).toHaveBeenCalledTimes(1);
      expect(sqsHandler.callPoll).toHaveBeenCalledTimes(1);
    });

    it('should poll the queue and not message', async () => {
      sqsHandler.started = true;
      sqsHandler.callPoll = jest.fn().mockResolvedValue(true);
      sqsHandler.processMessage = jest.fn().mockResolvedValue(true);
      sqsHandler.provider.fetchMessages = jest.fn().mockResolvedValue([]);
      await sqsHandler.poll();
      expect(sqsHandler.processMessage).not.toHaveBeenCalled();
      expect(sqsHandler.callPoll).toHaveBeenCalledTimes(1);
    });
  });

  describe('callPoll', () => {
    it('should call poll', async () => {
      sqsHandler.pollingWaitTimeMs = 10;
      sqsHandler.poll = jest.fn().mockResolvedValue(true);
      await sqsHandler.callPoll();
      expect(sqsHandler.poll).toHaveBeenCalled();
    });

    it('should not call poll', async () => {
      sqsHandler.signalStop = true;
      sqsHandler.started = true;
      sqsHandler.poll = jest.fn().mockResolvedValue(true);
      await sqsHandler.callPoll();
      expect(sqsHandler.poll).not.toHaveBeenCalled();
    });
  });

  describe('handle', () => {
    it('should handle throw an method not implemented error', async () => {
      const content = { content: 'content' };
      const metadata = { metadata: 'metadata' };
      await expect(sqsHandler.handle(content, metadata)).rejects.toThrow(
        'Method not implemented'
      );
    });
  });
});
