/* eslint-disable @typescript-eslint/no-empty-function */
import EvoluttyManager from '../src/managers';


class MockRouter {
    constructor(queueName: string, handler: Function) {}
}

const routes = [
    {
        routeType: MockRouter,
        queueName: 'test',
        handler: () => {},
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
