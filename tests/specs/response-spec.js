process.env['FAST_SMS_API_UNIT_TEST'] = '1';

process.env['FAST_SMS_API_HOSTNAME']        = 'A';
process.env['FAST_SMS_API_PROTOCOL']        = 'B';
process.env['FAST_SMS_API_PATH']            = 'C';
process.env['FAST_SMS_API_TOKEN']           = 'D';
process.env['FAST_SMS_API_CLIENT_INSTANCE'] = 'E';

var response = require(__dirname + "/../../src/response");

describe("Reads package version", function () {
    it("from package.json", function () {
        expect(response.resolveModuleVersion()+'' === '').toBe('0.1.32');
    });
});
