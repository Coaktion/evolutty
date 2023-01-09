class LuffyManager {
  routes: any;
  constructor(routes: any) {
    this.routes = routes;
  }

  start() {
    for (const route of this.routes) {
      new route.handler(route.provider.queueName);
    }
  }
}

export default LuffyManager;
