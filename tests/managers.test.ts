/* eslint-disable @typescript-eslint/no-empty-function */
import { EvoluttyManager } from '../src';

class MockRouter {
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
    const spy = jest.spyOn(EvoluttyManager.prototype, 'start');
    const manager = new EvoluttyManager(routes);
    manager.start();
    expect(spy).toHaveBeenCalled();
  });
});
