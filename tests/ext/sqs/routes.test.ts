import { SQSClientOptions, SQSHandler, SQSRouter } from '../../../src';

class Handler {
  start = jest.fn();
  async handle() {
    return true;
  }
}

describe('SQSHandler', () => {
  it('should return a router object', () => {
    expect(SQSHandler).toBeDefined();
  });

  it('should throw an error when queue name is not provided', () => {
    expect(() => new SQSRouter('', Handler, {})).toThrowError(
      'Queue name must be provided'
    );
  });

  it('should return a router object', () => {
    const router = new SQSRouter('test', Handler, {} as SQSClientOptions);
    expect(router).toBeDefined();
  });
});
