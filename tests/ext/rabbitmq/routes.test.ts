import { RabbitMQRouter } from '@/index';

class Handler {
  start = jest.fn();
  async handle() {
    return true;
  }
}

describe('RabbitMQRouter', () => {
  it('Should throw an error when queue name is not provided', () => {
    expect(() => new RabbitMQRouter('', Handler, {})).toThrowError(
      'Queue name must be provided'
    );
  });

  it('Should return a router object', () => {
    const router = new RabbitMQRouter('test-queue', Handler, {} as any);
    expect(router).toBeDefined();
  });
});
