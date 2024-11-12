import { LoggerService } from './logging';

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
abstract class AbstractMessageTranslator extends LoggerService {
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
  abstract translateMessage(
    message: any,
    ...args: any
  ): MessageTranslatorOutput;
}

export { AbstractMessageTranslator };
