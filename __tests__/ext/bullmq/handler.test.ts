import { ConnectionOptions, Job, Worker } from 'bullmq';
import Redis from 'ioredis-mock';

import { BullMQHandler, TranslateBullMQ } from '../../../src';

const funcEmpty = () => {};

const connection = {
  createClient: () => new Redis()
} as ConnectionOptions;

const job: Job = {
  moveToFailed: async (_error, _token) => {}
} as Job;

const { content, metadata } = {
  content: {
    text: 'Hello',
    from: 'en',
    to: 'es'
  },
  metadata: {
    id: '1234',
    name: 'test'
  }
} as TranslateBullMQ;

describe('BullMQHandler', () => {
  let handler: BullMQHandler;
  beforeEach(() => {
    jest.useFakeTimers();
    handler = new BullMQHandler('test', funcEmpty, { connection });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    handler.close();
  });

  it('should construct a handler object', () => {
    expect(handler).toBeInstanceOf(Worker);
  });

  it('should throw an error when calling handle', async () => {
    await expect(handler.handle({ content, metadata })).rejects.toThrowError(
      'Not implemented'
    );
  });

  it('should call handle when calling processJob', async () => {
    const handleSpy = jest.spyOn(handler, 'handle');
    await handler.processJob(job, 'token');
    expect(handleSpy).toHaveBeenCalled();
  });
});
