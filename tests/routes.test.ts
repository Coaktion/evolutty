import Router from '../src/routes';

class MockProvider {}
class MockHandler {}
class MockMessageTranslator {
  translate(message: string) {
    return {
      content: `translated ${message}`,
      metadata: { length: message.length }
    };
  }
}

class TestRouter extends Router {
  stop() {}
}

describe('Router', () => {
  let router: TestRouter;
  let mockProvider: MockProvider;
  let mockHandler: MockHandler;
  let mockMessageTranslator: MockMessageTranslator;

  beforeEach(() => {
    mockProvider = new MockProvider();
    mockHandler = new MockHandler();
    mockMessageTranslator = new MockMessageTranslator();
    router = new TestRouter(mockProvider, mockHandler, mockMessageTranslator);
  });

  test('should initialize with given provider, handler, and messageTranslator', () => {
    expect(router.provider).toBe(mockProvider);
    expect(router.handler).toBe(mockHandler);
    expect(router.messageTranslator).toBe(mockMessageTranslator);
  });

  test('should apply message translator correctly', () => {
    const message = 'hello';
    const result = router.applyMessageTranslator(message);
    expect(result.content).toBe('translated hello');
    expect(result.metadata).toEqual({ length: message.length });
  });

  test('should throw error if translated message has no content', () => {
    const faultyTranslator = {
      translate: () => ({ content: '', metadata: {} })
    };
    router = new TestRouter(mockProvider, mockHandler, faultyTranslator);
    expect(() => router.applyMessageTranslator('hello')).toThrow(
      'Translated message must have a content'
    );
  });

  test('should return original message if no messageTranslator is provided', () => {
    router = new TestRouter(mockProvider, mockHandler);
    const message = 'hello';
    const result = router.applyMessageTranslator(message);
    expect(result.content).toBe(message);
    expect(result.metadata).toEqual({});
  });
});
