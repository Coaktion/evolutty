import { BullMQHandler } from '../../../src/ext/bullmq/handler';

describe('BullMQHandler', () => {
    it('should return a handler object', () => {
        expect(BullMQHandler).toBeDefined();
    });
    
    it('should throw an error when calling handle', async () => {
        const handler = new BullMQHandler('test');
        await expect(handler.handle({}, {})).rejects.toThrowError('Not implemented');
    });
});
