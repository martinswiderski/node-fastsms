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
});

