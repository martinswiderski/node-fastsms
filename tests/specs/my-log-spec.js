var myLog = require(__dirname + "/../../src/my-log"),
    path  = require('path'),
    fs    = require('fs');

//console.log('------------------------------------------------');
//console.log('-- Logger                                     --');
//console.log(myLog);
//console.log('------------------------------------------------');

describe("Log implementation", function () {
    it("Has a common log file", function () {
        var logFile = myLog.logsDir + myLog.logFileCommon;
        expect(logFile).toBe(path.resolve(logFile));
    });
    it("Common file is writable", function () {
        var canWrite = false,
            logFile  = myLog.logsDir + myLog.logFileCommon,
            stat     = fs.statSync(logFile),
            canWrite = !!( 2 & (stat.mode & parseInt('777', 8)).toString(8)[0] );

        expect(canWrite).toBe(true);
    });
});

