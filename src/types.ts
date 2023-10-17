export interface RoutesType {
  /**
   * Route Type
   * @description class instance of the route type
   * @example
   * import { BullMQRouter } from 'evolutty';
   * const routeType = BullMQRouter;
   * @type {any}
   * @memberof RoutesType
   * @see {@link BullMQRouter}
   * @see {@link RabbitMQRouter}
   * @see {@link SQSRouter}
   */
  routeType: any;
  /**
   * Queue Name
   * @description name of the queue to be used
   * @example
   * const queueName = 'my-queue';
   * @type {string}
   * @memberof RoutesType
   * @see BullMQRouter
   */
  queueName: string;
  /**
   * Handler
   * @description class instance to be called when a message is received
   * @example
   * class MyHandler {
   *  async handle(message: any) {
   *   // message processing logic
   *  return true;
   * }
   * }
   * const handler = MyHandler;
   * @type {any}
   * @memberof RoutesType
   * @see BullMQHandler
   */
  handler: any;
  /**
   * Route Params
   * @description params to be passed to the route
   * @example
   * const routeParams = {
   *    abc: '123'
   * };
   * @type {object}
   * @memberof RoutesType
   * @see {@link RabbitMQClientOptions}
   * @see {@link SQSClientOptions}
   */
  routeParams?: object;
}
