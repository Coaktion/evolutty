import AbstractProvider from "../luffy/providers";

describe("AbstractProvider", () => {
    it("should throw an error when calling fetchMessages", () => {
        const provider = new AbstractProvider();
        expect(provider.fetchMessages).toThrowError();
    });

    it("should throw an error when calling confirmMessage", () => {
        const provider = new AbstractProvider();
        expect(provider.confirmMessage).toThrowError();
    });

    it("should throw an error when calling messageNotProcessed", () => {
        const provider = new AbstractProvider();
        expect(provider.messageNotProcessed).toThrowError();
    });

    it("should throw an error when calling stop", () => {
        const provider = new AbstractProvider();
        expect(provider.stop).toThrowError();
    });
});
