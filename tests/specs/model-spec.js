var model         = require(__dirname + "/../../src/model"),
    validate      = require(__dirname + "/../../src/validate"),
    configuration = require(__dirname + "/../../src/configuration");

describe("Can retrive model template", function () {

    var template = model.get('OneDoesNotExist');
    it("for not allowed returns FALSE", function () {
        expect(template).toBe(false);
    });

    var ok = model.get('Send');
    it("for existing ones returns object with auto-opulated token", function () {
        expect(validate.typeOf(ok)).toBe('Object');
        expect(validate.typeOf(ok.Token)).toBe('String');
        expect(ok.Token).toBe(configuration.token);
    });
});

