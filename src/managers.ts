import { LoggerService } from './logging';
import { RoutesType } from './types';

/**
 * EvoluttyManager class
 * @description Manages the routes and starts Evolutty
 * @class EvoluttyManager
 * @example
 * const evolutty = new EvoluttyManager(routes);
 * evolutty.start();
 */
class EvoluttyManager extends LoggerService {
  routes: RoutesType[];
  /**
   * Creates an instance of EvoluttyManager.
   * @param {RoutesType[]} routes - Routes to be managed
   * @memberof EvoluttyManager
   */
  constructor(routes: RoutesType[]) {
    super();
    this.routes = routes;
  }

  /**
   * Starts Evolutty
   * @returns {void}
   * @memberof EvoluttyManager
   * @example
   * const evolutty = new EvoluttyManager(routes);
   * evolutty.start();
   * // Evolutty started
   */
  start() {
    for (const route of this.routes) {
      new route.routeType(
        route.queueName,
        route.handler,
        route.routeParams
      ).start();
    }
    this.info('Evolutty started');
  }
}

export default EvoluttyManager;
