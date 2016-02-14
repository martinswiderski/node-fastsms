process.env['FAST_SMS_API_UNIT_TEST']       = '1';
process.env['FAST_SMS_API_HOSTNAME']        = 'A';
process.env['FAST_SMS_API_PROTOCOL']        = 'B';
process.env['FAST_SMS_API_PATH']            = 'C';
process.env['FAST_SMS_API_TOKEN']           = 'D';
process.env['FAST_SMS_API_CLIENT_INSTANCE'] = 'E';

var md5      = require('md5'),
    response = require(__dirname + "/../../src/response");

var message   = 'This is my Message ',
    exec      = 234,
    chkCredits = true,
    respBlank = response.render('-509', 404, md5(message), message.length, exec, chkCredits, mockGetCreditsFunction),
    respValid = {};

function mockGetCreditsFunction() {
    return 1234567890;
}
// --- Assertions
describe("Reads package version", function () {
    it("from package.json file", function () {
        expect(response.resolveModuleVersion()+'' === '0.1.32').toBe(true);
    });
});

describe("Generates response for failed HTTP transaction in JSON envelope", function () {
    //console.log(JSON.stringify(respBlank, null, 4));

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

    it("API and HTTP information populated if error codes are provided", function () {
        expect(respBlank.error.status === true).toBe(true);
        expect((typeof respBlank.http.code) === 'number').toBe(true);
        expect(respBlank.http.code === 404).toBe(true);
        expect(respBlank.http.status === 'Not Found').toBe(true);
        expect((typeof respBlank.api.code) === 'number').toBe(true);
        expect(respBlank.api.code === -509).toBe(true);
        expect(respBlank.api.status === 'Unknown/Invalid User').toBe(true);
        expect(respBlank.error.details.length > 0).toBe(true);
        expect((typeof respBlank.error.details[0]) === 'object').toBe(true);
        expect(respBlank.error.details[0].type === 'HTTP').toBe(true);
        expect(respBlank.error.details[0].code === 404).toBe(true);
        expect(respBlank.error.details[0].status === 'Not Found').toBe(true);
        expect((typeof respBlank.error.details[1]) === 'object').toBe(true);
        expect(respBlank.error.details[1].type === 'API').toBe(true);
        expect(respBlank.error.details[1].code === -509).toBe(true);
        expect(respBlank.error.details[1].status === 'Unknown/Invalid User').toBe(true);
    });

    it("Message length and MD5 are also set", function () {
        expect(respBlank.version === '0.1.32').toBe(true);
        expect(respBlank.message.content.md5 === md5(message)).toBe(true);
        expect(respBlank.message.content.length === message.length).toBe(true);
    });

    it("Message is always given unique UID and numeric ID or zero is allocated", function () {
        expect(respBlank.message.uuid.length === 36).toBe(true);
        expect((typeof respBlank.message.id) === 'number').toBe(true);
        expect(respBlank.message.id === 0).toBe(true);
    });
});


respValid = response.render(234567, 200, md5(message), message.length, exec, chkCredits, mockGetCreditsFunction);

describe("Generates response for a valid HTTP transaction in JSON envelope", function () {
    //console.log(JSON.stringify(respValid, null, 4));

    it("Message is always given unique UID and numeric ID or zero is allocated", function () {
        expect(respValid.message.uuid.length === 36).toBe(true);
        expect((typeof respValid.message.id) === 'number').toBe(true);
        expect(respValid.message.id === 234567).toBe(true);
    });

    it("HTTP Status is 200, API error is empty & error status is FALSE", function () {
        expect((typeof respValid.api.code) === 'boolean').toBe(true);
        expect(respValid.api.code === false).toBe(true);
        expect(respValid.api.status === false).toBe(true);
        expect(respValid.http.code === 200).toBe(true);
        expect(respValid.http.status === 'OK').toBe(true);
        expect(respValid.error.details.length === 0).toBe(true);
    });
});
