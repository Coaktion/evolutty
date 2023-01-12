import logging from "../src/logging";

describe("logging", () => {
    it("should return a logger info", () => {
        const logger = logging.info("test");
        expect(logger).toBeDefined();
    });
});
