var configuration = require(__dirname + "/../../src/configuration");

describe("Reads from env vars", function () {
    it("regardless how they are sey", function () {
        expect(configuration.hostname).toBe(process.env['FAST_SMS_API_HOSTNAME']);
        expect(configuration.protocol).toBe(process.env['FAST_SMS_API_PROTOCOL']);
        expect(configuration.path).toBe(process.env['FAST_SMS_API_PATH']);
        expect(configuration.token).toBe(process.env['FAST_SMS_API_TOKEN']);
    });
});
