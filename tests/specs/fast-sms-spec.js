var mockConfig = {
        mock: true,
        hostname: 'my.fastsms.co.uk',
        protocol: 'https',
        path: '/api',
        token: 'TOKEN',
        messages: {}
    },
    md5           = require('md5'),
    configuration = require(__dirname + "/../../src/configuration"),
    valid         = require(__dirname + "/../../src/validate"),
    fastSms       = require(__dirname + "/../../src/fast-sms");

    for (var k in mockConfig) {
        configuration[k] = mockConfig[k];
    }

describe("Can send SMS", function () {

    var content = 'Hello World%$',
        sender  = 'Martin',
        to      = '447932415775',
        resEnv  = fastSms.sendOne(to, content, sender);

    it("message envelope returned is JSON object", function () {
        expect(valid.typeOf(resEnv)).toBe('Object');
    });

    it("certain content expected", function () {
        expect(resEnv.message.id).toBe(654321);
        expect(resEnv.message.content.md5).toBe(md5(content));
        expect(resEnv.message.content.source).toBe(sender);
        expect(resEnv.message.content.target).toBe(to);
        expect(resEnv.credits).toBe(100);
        expect(resEnv.http.code).toBe(200);
        expect(resEnv.http.status).toBe('OK');
        expect(resEnv.api.code).toBe(false);
        expect(resEnv.api.status).toBe(false);
    });
});

