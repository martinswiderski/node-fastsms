process.env['FAST_SMS_API_HOSTNAME'] = 'A';
process.env['FAST_SMS_API_PROTOCOL'] = 'B';
process.env['FAST_SMS_API_PATH']     = 'C';
process.env['FAST_SMS_API_TOKEN']    = 'D';

var configuration = require(__dirname + "/../../src/configuration");

describe("Reads from env vars", function () {
    it("regardless how they are sey", function () {
        expect(configuration.hostname).toBe('A');
        expect(configuration.protocol).toBe('B');
        expect(configuration.path).toBe('C');
        expect(configuration.token).toBe('D');
    });
});
