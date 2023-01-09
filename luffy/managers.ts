class LuffyManager {
  routes: any;
  constructor(routes) {
    this.routes = routes;
  }

  start() {
    for (const route of this.routes) {
      new route.handler(route.queueName);
    }
  }
}

export default LuffyManager;
