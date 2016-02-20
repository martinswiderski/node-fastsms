var dateTool = require(__dirname + "/../../src/date-tool");

describe("Can transform between formats", function () {
    it("Compact to ISO", function () {
        expect(dateTool.reformatDateIso("20160612140030")).toBe("2016-06-12T14:00:30Z");
        expect(dateTool.reformatDateIso("2016-06-12 14:00")).toBe(false);
    });
    it("Compact to UNIX", function () {
        expect(dateTool.reformatDateUnix("20160612140030")).toBe(1465740030);
        expect(dateTool.reformatDateUnix("2016-06-12 14:00")).toBe(false);
    });
    it("Date is in the future", function () {
        expect(dateTool.isDateInTheFuture("20190612140030")).toBe(true);
        expect(dateTool.isDateInTheFuture("20120612140030")).toBe(false);
    });
});

describe("Can generate microtime", function () {
    it("by default as INT", function () {
        var asIntDefault = dateTool.microtime();
        expect((asIntDefault + '' === parseInt(asIntDefault) + '')).toBe(true);
    });
    it("by default as INT", function () {
        var asIntExplicit = dateTool.microtime('integer');
        expect((asIntExplicit + '' === parseInt(asIntExplicit) + '')).toBe(true);
    });
    it("as FLOAT", function () {
        var asFloat = dateTool.microtime('float');
        expect((new String(asFloat)).split('.').length).toBe(2);
    });
});


describe("Can calculate execution time", function () {

    var microtimeBefore = dateTool.microtime();
    for (var i = 0; i < 50000000; i++) {
        // loop
    }
    var microtimeAfter = dateTool.microtime();

    it("Exec expected to be more than 10 ms", function () {
        var asIntDefault = dateTool.microtime();
        expect((microtimeAfter - microtimeBefore) > 5).toBe(true);
    });
});
