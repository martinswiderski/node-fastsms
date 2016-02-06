var myLog = require(__dirname + "/../../src/my-log"),
    path  = require('path'),
    fs    = require('fs'),
    uuid  = require('uuid');

    myLog.logFileCommon = 'unit-test.log'; // swap log file

describe("Log implementation", function () {
    it("Has a common log file", function () {
        var logFile = myLog.logsDir + myLog.logFileCommon;
        expect(logFile).toBe(path.resolve(logFile));
    });
    it("Common log file is writable", function () {
        var canWrite = false,
            logFile  = myLog.logsDir + myLog.logFileCommon,
            stat     = fs.statSync(logFile),
            canWrite = !!( 2 & (stat.mode & parseInt('777', 8)).toString(8)[0] );

        expect(canWrite).toBe(true);
    });
    it("Instance (premise) ID is declared", function () {
        expect(myLog.instance.length > 0).toBe(true);
    });

    var uid = uuid.v4(),
        expected = {
            info: '[INFO] ' + myLog.instance + ' - Error ID: ' + uid,
            warn: '[WARN] ' + myLog.instance + ' - Error ID: ' + uid,
            error: '[ERROR] ' + myLog.instance + ' - Error ID: ' + uid,
            fatal: '[FATAL] ' + myLog.instance + ' - Error ID: ' + uid
        };

    // running all logs...
    myLog.log().info('Error ID: %s', uid);
    myLog.log().warn('Error ID: %s', uid);
    myLog.log().error('Error ID: %s', uid);
    myLog.log().fatal('Error ID: %s', uid);

    var buffer = fs.readFileSync(myLog.logsDir + '/' + myLog.logFileCommon),
        logStr = buffer.toString();

    it("It does write to log file", function () {
        expect(logStr.replace(expected.info, 'XYZ') === buffer).toBe(false);
        expect(logStr.replace(expected.warn, 'XYZ') === buffer).toBe(false);
        expect(logStr.replace(expected.error, 'XYZ') === buffer).toBe(false);
        expect(logStr.replace(expected.fatal, 'XYZ') === buffer).toBe(false);
    });

});

