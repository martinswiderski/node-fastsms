var actions = require(__dirname + "/../../src/actions");

describe("Allowed actions", function () {
    it("Can be tested for validity", function () {
        expect(actions.isValid("CheckCredits")).toBe(true);
        expect(actions.isValid("CheckMessageStatus")).toBe(true);
        expect(actions.isValid("Send")).toBe(true);
        expect(actions.isValid("Report")).toBe(true);
        expect(actions.isValid("CreateUser")).toBe(true);
        expect(actions.isValid("UpdateCredits")).toBe(true);
        expect(actions.isValid("ImportContactsCSV")).toBe(true);
        expect(actions.isValid("DeleteAllContacts")).toBe(true);
        expect(actions.isValid("DeleteAllGroups")).toBe(true);
    });
});

