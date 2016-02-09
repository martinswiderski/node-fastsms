var opCode = require(__dirname + "/../../src/op-code");

describe("Taking HTTP response code and possible API Err Code", function () {

    it("checks if cast-able to integer", function () {
        expect(opCode.integerOrFalse('')).toBe(false);
        expect(opCode.integerOrFalse('ABC')).toBe(false);
        expect(opCode.integerOrFalse(false)).toBe(false);
        expect(opCode.integerOrFalse(true)).toBe(false);
        expect(opCode.integerOrFalse(null)).toBe(false);

        expect(opCode.integerOrFalse(1234.45)).toBe(1234);
        expect(opCode.integerOrFalse('1234.45')).toBe(1234);
        expect(opCode.integerOrFalse('234')).toBe(234);
        expect(opCode.integerOrFalse(123456)).toBe(123456);
    });

    var invalidUser = opCode.resolve("200", "-509");
    it("invalid credentials are picked up", function () {
        expect(invalidUser.api.code).toBe(-509);
        expect(invalidUser.api.status).toBe('API Error: Unknown/Invalid User');
        expect(invalidUser.http.code).toBe(200);
        expect(invalidUser.http.status).toBe('HTTP Status: OK');
    });

    var noHttpCodeNoApiError = opCode.resolve(null, null);
    it("picks up no valid HTTP code and no Err API responses (ones does not make much sense)", function () {
        expect(noHttpCodeNoApiError.api.code).toBe(-1);
        expect(noHttpCodeNoApiError.api.status).toBe('API Error: Not defined');
        expect(noHttpCodeNoApiError.http.code).toBe(0);
        expect(noHttpCodeNoApiError.http.status).toBe('HTTP Status: Not defined');
    });

    var goodCall = opCode.resolve("200", "");
    it("good call has no errors", function () {
        expect(goodCall.api.code).toBe(-1);
        expect(goodCall.api.status).toBe('API Error: Not defined');
        expect(goodCall.http.code).toBe(200);
        expect(goodCall.http.status).toBe('HTTP Status: OK');
    });

});

