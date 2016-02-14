var nodeFastSms = require('../../index');

xdescribe("Core tests", function () {
    // implementation not ready yet...
    it("Methods not implemented", function () {
        expect(nodeFastSms.reports()).toBe("not implemented");
        expect(nodeFastSms.createUser()).toBe("not implemented");
        expect(nodeFastSms.updateCredits()).toBe("not implemented");
        expect(nodeFastSms.importContactsCsv()).toBe("not implemented");
        expect(nodeFastSms.deleteAllContacts()).toBe("not implemented");
        expect(nodeFastSms.deleteAllGroups()).toBe("not implemented");
        expect(nodeFastSms.emptyGroup()).toBe("not implemented");
        expect(nodeFastSms.deleteGroup()).toBe("not implemented");
        expect(nodeFastSms.getBgMessages()).toBe("not implemented");
    });
});
