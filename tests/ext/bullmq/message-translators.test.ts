import { Job } from 'bullmq';

import { BullMQMessageTranslator } from '../../../src';

const job: Job = {
  data: { test: 'test' },
  id: '1',
  name: 'test',
  timestamp: 1673530769,
  opts: {}
} as Job;

const token = 'f62bcbe0-24de-4b37-9b90-9e0ff21f62db';

describe('BullMQMessageTranslator', () => {
  it('should return a handler object', () => {
    expect(BullMQMessageTranslator).toBeDefined();
  });

  it('should return a message object', () => {
    const translator = new BullMQMessageTranslator();
    const message = translator.translate(job, token);
    expect(message).toEqual({
      content: { test: 'test' },
      metadata: {
        id: '1',
        name: 'test',
        timestamp: 1673530769,
        opts: {},
        job,
        token
      }
    });
  });
});
