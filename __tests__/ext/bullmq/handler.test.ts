import { Job } from 'bullmq';
import BullMQHandler from '../../../src/ext/bullmq/handler';

describe('BullMQHandler', () => {
    it('should return a handler object', () => {
        expect(BullMQHandler).toBeDefined();
    });
    
    it('should throw an error when calling handle', async () => {
        const handler = new BullMQHandler();
        await expect(handler.handle({} as Job, 'token')).rejects.toThrowError('Not implemented');
    });
});
