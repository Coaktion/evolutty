import { BullMQRouter } from '../../../src';

jest.mock('bullmq', () => {
  return {
    Worker: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn()
      };
    })
  };
});

class Handler {
  async handle() {
    return true;
  }
}

describe('BullMQRouter', () => {
  it('should return a router object', () => {
    expect(BullMQRouter).toBeDefined();
  });

  it('should throw an error when queue name is not provided', () => {
    expect(() => new BullMQRouter('', Handler)).toThrowError(
      'Queue name must be provided'
    );
  });

  it('should return a router object', async () => {
    const router = new BullMQRouter('test', Handler);

    await router.start();

    expect(router).toBeDefined();
  });
});
