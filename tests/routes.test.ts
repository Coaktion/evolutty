import { Router } from '../src';

const provider = {
  stop: () => {}
};
const handler = () => {};
const messageTranslator = {
  translate: (content: any) => {
    return {
      content,
      metadata: {}
    };
  }
};

describe('Router', () => {
  it('should return a router object', () => {
    expect(Router).toBeDefined();
  });

  it('applyMessageTranslator if not messageTranslator', () => {
    const router = new Router(provider, handler);
    const message = router.applyMessageTranslator('test');
    expect(message).toEqual({
      content: 'test',
      metadata: {}
    });
  });

  it('should throw an error when calling applyMessageTranslator', () => {
    const router = new Router(provider, handler, messageTranslator);
    expect(() => router.applyMessageTranslator('')).toThrowError(
      'Translated message must have a content'
    );
  });

  it('must bring translated content through the custom method', () => {
    const router = new Router(provider, handler, messageTranslator);
    const message = router.applyMessageTranslator('test');
    expect(message).toEqual({
      content: 'test',
      metadata: {}
    });
  });

  it('should calling stop provider when call stop router method', () => {
    const router = new Router(provider, handler);
    const spy = jest.spyOn(provider, 'stop');
    router.stop();
    expect(spy).toHaveBeenCalled();
  });
});
