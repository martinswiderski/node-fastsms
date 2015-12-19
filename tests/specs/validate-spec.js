var validate = require(__dirname + "/../../src/validate");

describe("Can validate data types", function () {
    it("Input types for send", function () {

        expect(validate.internationalMobile("447234123456")).toBe(true);
        expect(validate.internationalMobile("+447234123456")).toBe(true);
        expect(validate.internationalMobile("ABC12345")).toBe(false);

        expect(validate.scheduledDate("20160612140030")).toBe(false);
        expect(validate.scheduledDate("ABC")).toBe(false);
        expect(validate.scheduledDate("2016-06-12 14:00")).toBe(false);

    });
});
