/* eslint-disable @typescript-eslint/no-empty-function */
import EvoluttyManager from '../src/managers';

class MockRouter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_queueName: string, _handler: any) {}
}

const routes = [
  {
    routeType: MockRouter,
    queueName: 'test',
    handler: () => {}
  }
];

describe('EvoluttyManager', () => {
  it('start method should call new routeType', () => {
    const manager = new EvoluttyManager(routes);
    const spy = jest.spyOn(manager, 'start');
    manager.start();
    expect(spy).toHaveBeenCalled();
  });
});
