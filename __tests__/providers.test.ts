import AbstractProvider from '../src/providers';

describe('AbstractProvider', () => {
    it('should throw an error when calling fetchMessages', () => {
        const provider = new AbstractProvider();
        expect(provider.fetchMessages()).rejects.toThrowError();
    });

    it('should throw an error when calling confirmMessage', () => {
        const provider = new AbstractProvider();
        expect(provider.confirmMessage({})).rejects.toThrowError();
    });

    it('should throw an error when calling messageNotProcessed', () => {
        const provider = new AbstractProvider();
        expect(provider.messageNotProcessed({})).rejects.toThrowError();
    });
});
