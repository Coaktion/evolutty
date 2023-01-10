import logging from "./logging";

class EvoluttyManager {
  routes: any;
  constructor(routes: any) {
    this.routes = routes;
  }

  start() {
    for (const route of this.routes) {
      new route.handler(route.provider.queueName);
    }
    logging.info("Evolutty started");
  }
}

export default EvoluttyManager;
