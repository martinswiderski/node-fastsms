var mockConfig = {
        mock: true,
        hostname: 'my.fastsms.co.uk',
        protocol: 'https',
        path: '/api',
        token: 'TOKEN',
        messages: {}
    },
    valid   = require(__dirname + "/../../src/validate"),
    fastSms = require(__dirname + "/../../src/fast-sms");
    fastSms.setConfig(mockConfig);

describe("Can send SMS", function () {

    var sentId = fastSms.sendOne('447932415775', 'Hello World%$', 'Martin');

    it("message ID is returned", function () {
        expect(valid.typeOf(sentId)).toBe('Number');
    });

    it("GET request is issued", function () {
        expect(mockConfig.messages[sentId].url).toBe('https://my.fastsms.co.uk/api?Token=TOKEN&Action=Send&DestinationAddress=447932415775&SourceAddress=Martin&Body=Hello%20World%25%24&ValidityPeriod=259200');
    });
});

