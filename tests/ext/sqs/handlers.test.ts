import { SQSHandler } from '../../../src';

jest.mock('../../../src/ext/sqs/providers');

describe('SQSHandler', () => {
  let handler: SQSHandler;
  let startSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
    startSpy = jest.spyOn(SQSHandler.prototype, 'start');
    handler = new SQSHandler('test', {});
    handler.provider = {
      getMessages: jest.fn().mockResolvedValue([]),
      confirmMessage: jest.fn(),
      messageNotProcessed: jest.fn()
    } as any;
  });

  it('should have a start method', () => {
    expect(SQSHandler.prototype.start).toBeDefined();
  });

  it('should call start on construction', () => {
    expect(startSpy).toHaveBeenCalled();
  });

  // it('should call poll on start call', () => {
  //   startSpy.mockRestore();
  //   const pollSpy = jest.spyOn(SQSHandler.prototype, 'poll');
  //   handler.start();
  //   expect(pollSpy).toHaveBeenCalled();
  //   expect(handler.started).toBe(true);
  // });

  it('should have a stop method', () => {
    expect(SQSHandler.prototype.stop).toBeDefined();
  });

  it('should set started to false on stop call', () => {
    handler.started = true;
    handler.stop();
    expect(handler.started).toBe(false);
  });

  it('should void on stop call when started equal false', () => {
    jest.spyOn(SQSHandler.prototype, 'poll');
    handler.started = false;
    const response = handler.stop();
    expect(response).toBeUndefined();
  });

  it('should have a processMessage method', () => {
    expect(SQSHandler.prototype.processMessage).toBeDefined();
  });

  it('should call handle on processMessage', async () => {
    handler.messageTranslator.translateMessage = jest.fn().mockReturnValue({
      content: {},
      metadata: {}
    });

    handler.handle = jest.fn().mockResolvedValue(true);
    handler.provider.confirmMessage = jest.fn();
    await handler.processMessage({});
    expect(handler.handle).toHaveBeenCalled();
    expect(handler.provider.confirmMessage).toHaveBeenCalled();
  });

  it('should thorw error on processMessage and not deleteMessage', async () => {
    handler.messageTranslator.translateMessage = jest.fn().mockReturnValue({
      content: {},
      metadata: {}
    });

    handler.handle = jest.fn().mockRejectedValue(new Error('test'));
    handler.provider.confirmMessage = jest.fn();
    handler.provider.messageNotProcessed = jest.fn();
    await handler.processMessage({});
    expect(handler.handle).toHaveBeenCalled();
    expect(handler.provider.confirmMessage).not.toHaveBeenCalled();
    expect(handler.provider.messageNotProcessed).toHaveBeenCalled();
  });

  it('should thorw error on processMessage and deleteMessage', async () => {
    handler.messageTranslator.translateMessage = jest.fn().mockReturnValue({
      content: {},
      metadata: {}
    });

    handler.handle = jest.fn().mockRejectedValue({ deleteMessage: true });
    handler.provider.confirmMessage = jest.fn();
    handler.provider.messageNotProcessed = jest.fn();
    await handler.processMessage({});
    expect(handler.handle).toHaveBeenCalled();
    expect(handler.provider.confirmMessage).toHaveBeenCalled();
    expect(handler.provider.messageNotProcessed).not.toHaveBeenCalled();
  });
});
