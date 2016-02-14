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

    function mockGetCreditsFunction() {
        return 1234567890;
    }

    var message   = 'This is my Message ',
        exec      = 234,
        chkCredits = true,
        respBlank = response.render('-509', 404, md5(message), message.length, exec, chkCredits, mockGetCreditsFunction);

    console.log(JSON.stringify(respBlank, null, 4));
    it("Even blank and incomplete object contains configuration & version id", function () {
        expect(respBlank.version === '0.1.32').toBe(true);
        expect(respBlank.config.hostname === 'A').toBe(true);
        expect(respBlank.config.protocol === 'B').toBe(true);
        expect(respBlank.config.path === 'C').toBe(true);
        expect(respBlank.config.token === 'Check your FAST_SMS_API_TOKEN').toBe(true); // your actual token feeds from EnvVars
        expect(respBlank.config.instanceId === 'E').toBe(true);
    });

    it("When flag is passed and external function it is called to calculate credits", function () {
        expect(chkCredits).toBe(true);
        expect(respBlank.credits === mockGetCreditsFunction()).toBe(true);
    });

    it("Message length and MD5 are also set", function () {
        expect(respBlank.version === '0.1.32').toBe(true);
        expect(respBlank.message.content.md5 === md5(message)).toBe(true);
        expect(respBlank.message.content.length === message.length).toBe(true);
    });

    it("Message is always given unique UID and numeric ID or zero is allocated", function () {
        expect(respBlank.message.uuid.length === 36).toBe(true);
        expect((typeof respBlank.message.id) === 'number').toBe(true);
    });


});

