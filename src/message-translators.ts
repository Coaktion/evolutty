import logging from './logging';

interface MessageTranslatorOutput {
  content: any;
  metadata: any;
}

/**
 * AbstractMessageTranslator class
 * @description Abstract class to be extended by message translators
 * @class AbstractMessageTranslator
 * @example
 * class StringMessageTranslator extends AbstractMessageTranslator {
 *  translate(message: string): object {
 *   logging.debug('Translating message to string');
 *   return {
 *     content: message,
 *     metadata: {}
 *   };
 * }
 */
class AbstractMessageTranslator {
  /**
   * Translate a given message to an appropriate format to message processing
   * This method should return a `object` instance with two keys: `content` and `metadata`.
   * The `content` should contain the translated message and, `metadata` a
   * object with translation metadata or an empty `json` object.
   * @param {any} message - Message to be translated
   * @param {any} args - Additional arguments to be used by the translator
   * @returns {object} - Translated message
   * @memberof AbstractMessageTranslator
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  translateMessage(message: any, ...args: any): MessageTranslatorOutput {
    /**
     * Translate a given message to an appropriate format to message processing
     * This method should return a `object` instance with two keys: `content` and `metadata`.
     * The `content` should contain the translated message and, `metadata` a
     * object with translation metadata or an empty `json` object.
     */
    throw new Error('Method not implemented.');
  }
}

/**
 * StringMessageTranslator class
 * @description Translates a string message to an object
 * @class StringMessageTranslator
 * @example
 * const stringMessageTranslator = new StringMessageTranslator();
 * const translatedMessage = stringMessageTranslator.translate('Hello World!');
 * // translatedMessage = {
 * //   content: 'Hello World!',
 * //   metadata: {}
 * // }
 * @extends AbstractMessageTranslator
 * @see AbstractMessageTranslator
 */
class StringMessageTranslator extends AbstractMessageTranslator {
  /**
   * Translate a given message to an appropriate format to message processing
   * This method should return a `object` instance with two keys: `content` and `metadata`.
   * The `content` should contain the translated message and, `metadata` a
   * object with translation metadata or an empty `json` object.
   * @param {string} message - Message to be translated
   * @returns {object} - Translated message
   * @memberof StringMessageTranslator
   */
  translate(message: string): object {
    logging.debug('Translating message to string');
    return {
      content: message,
      metadata: {}
    };
  }
}

export { AbstractMessageTranslator, StringMessageTranslator };
