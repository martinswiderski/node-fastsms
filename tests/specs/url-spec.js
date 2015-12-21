var url = require(__dirname + "/../../src/url");

describe("Can build URL", function () {

    var correct = url.build('http', '127.0.0.1', '/api/', { session: 'ON', hello: 'World&'});

    it("as escaped string having correct attributes passed", function () {
        expect(correct).toBe('http://127.0.0.1/api/?session=ON&hello=World%26');
    });
});

describe("Throws errors", function () {

    var boo = url.build('http', '127.0.0.1', '/api/', false);

    it("for incorrect input FALSE is returned", function () {
        expect(boo).toBe(false);
    });
});

