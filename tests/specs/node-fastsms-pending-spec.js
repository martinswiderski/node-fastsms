process.env['FAST_SMS_API_UNIT_TEST'] = '1';

process.env['FAST_SMS_API_HOSTNAME']        = 'A';
process.env['FAST_SMS_API_PROTOCOL']        = 'B';
process.env['FAST_SMS_API_PATH']            = 'C';
process.env['FAST_SMS_API_TOKEN']           = 'D';
process.env['FAST_SMS_API_CLIENT_INSTANCE'] = 'E';

var nodeFastSms  = require('../../index'),
    errorMessage;

describe("Core tests", function () {
    // implementation not ready yet...
    it("Methods not implemented", function () {

        errorMessage = {};
        try {
            nodeFastSms.reports()
        } catch (err) {
            errorMessage = err;
        }

        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.createUser()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.updateCredits()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.importContactsCsv()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.deleteAllContacts()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.deleteAllGroups()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.emptyGroup()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.deleteGroup()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

        errorMessage = {};
        try {
            nodeFastSms.getBgMessages()
        } catch (err) {
            errorMessage = err;
        }
        expect(typeof errorMessage).toBe("object");
        expect(errorMessage.message).toBe("not implemented");

    });
});
