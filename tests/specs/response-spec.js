process.env['FAST_SMS_API_UNIT_TEST'] = '1';

process.env['FAST_SMS_API_HOSTNAME']        = 'A';
process.env['FAST_SMS_API_PROTOCOL']        = 'B';
process.env['FAST_SMS_API_PATH']            = 'C';
process.env['FAST_SMS_API_TOKEN']           = 'D';
process.env['FAST_SMS_API_CLIENT_INSTANCE'] = 'E';

var md5      = require('md5'),
    response = require(__dirname + "/../../src/response");

describe("Reads package version", function () {
    it("from package.json file", function () {
        expect(response.resolveModuleVersion()+'' === '0.1.32').toBe(true);
    });
});

describe("Generate response for HTTP transaction in JSON envelope", function () {
    var message = 'This is my Message ',
        resp    = response.render('-509', 200, md5(message), message.length, 234, false);

    //console.log(resp);
    it("Even blank and incomplete object contains configuration & version id", function () {
        expect(resp.version === '0.1.32').toBe(true);
        expect(resp.config.hostname === 'A').toBe(true);
        expect(resp.config.protocol === 'B').toBe(true);
        expect(resp.config.path === 'C').toBe(true);
        expect(resp.config.token === 'Check your FAST_SMS_API_TOKEN').toBe(true);
        expect(resp.config.instanceId === 'E').toBe(true);
    });
});

