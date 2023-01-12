/* eslint-disable @typescript-eslint/no-empty-function */
import { BullMQHandler } from '../../../src/ext/bullmq/handler';
import { ConnectionOptions, Job, Worker } from 'bullmq';
import { redisMock } from 'ioredis-mock';


const connection = {
    createClient: () => new redisMock(),
} as ConnectionOptions;

const job: Job = {
    moveToFailed: async (error, token) => {},
} as Job;

describe('BullMQHandler', () => {
    it('should construct a handler object', () => {
        jest.spyOn(Worker.prototype, 'on');
        const handler = new BullMQHandler('test', () => {}, {connection});
        expect(handler).toBeInstanceOf(Worker);
        handler.close();
    });
    
    it('should throw an error when calling handle', async () => {
        const handler = new BullMQHandler('test', () => {}, {connection});
        await expect(handler.handle({}, {})).rejects.toThrowError('Not implemented');
        handler.close();
    });

    it('should call handle when calling processJob', async () => {
        const handler = new BullMQHandler('test', () => {}, {connection});
        const handleSpy = jest.spyOn(handler, 'handle');
        await handler.processJob(job, 'token');
        expect(handleSpy).toHaveBeenCalled();
        handler.close();
    });
});
