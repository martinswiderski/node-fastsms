if (!process.env['FAST_SMS_API_TOKEN'] || process.env['FAST_SMS_API_TOKEN'].length === 0) {
    process.env['FAST_SMS_API_TOKEN'] = 'MADE-UP-FOR-TEST'; // just to avoid exception
}

var configuration = require(__dirname + "/../../src/configuration");

describe("Reads from env vars", function () {
    it("if they are set", function () {
        expect(configuration.hostname + '').toBe('my.fastsms.co.uk');
        expect(configuration.protocol + '').toBe('https');
        expect(configuration.path + '').toBe('/api');
        expect(configuration.token + '').toBe('MADE-UP-FOR-TEST');
    });
});
