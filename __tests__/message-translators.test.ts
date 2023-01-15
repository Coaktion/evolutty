import {
  AbstractMessageTranslator,
  StringMessageTranslator
} from '../src/message-translators';

describe('AbstractMessageTranslator', () => {
  it('should throw an error when calling translate', () => {
    const translator = new AbstractMessageTranslator();
    expect(() => translator.translate('')).toThrowError(
      'Method not implemented.'
    );
  });
});

describe('StringMessageTranslator', () => {
  it('should translate a string to an object', () => {
    const translator = new StringMessageTranslator();
    const message = 'Hello World!';
    const translated = translator.translate(message);
    expect(translated).toEqual({
      content: message,
      metadata: {}
    });
  });
});
