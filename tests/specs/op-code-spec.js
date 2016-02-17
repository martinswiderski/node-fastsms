var opCode = require(__dirname + "/../../src/op-code");

describe("Response codes can be resolved", function () {

    it("Unspecified type returns FALSE", function () {
        expect(opCode.resolve(200, 'doesnotexist')).toBe(false);
    });

    it("HTTP codes if exist or are not defined", function () {
        expect(opCode.resolve(200, 'http')).toBe('OK');
        expect(opCode.resolve('404', 'http')).toBe('Not Found');
        expect(opCode.resolve(false, 'http')).toBe('Not defined');
        expect(opCode.resolve('booo', 'http')).toBe('Not defined');
    });

    it("API codes if exist or are not defined", function () {
        expect(opCode.resolve('-509', 'api')).toBe('Unknown/Invalid User');
        expect(opCode.resolve('-300', 'api')).toBe('General Database Error');
        expect(opCode.resolve(false, 'api')).toBe('Not defined');
        expect(opCode.resolve('booo', 'api')).toBe('Not defined');
    });
});

