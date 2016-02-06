
var myLog,
    path          = require('path'),
    logsDir       = path.resolve(__dirname + '/../log/') + '/',
    logFileCommon = 'common.log';


myLog = function myLog(myLogsDir, myLogFileCommon) {

    this.logsDir       = myLogsDir;
    this.logFileCommon = myLogFileCommon;


};

module.exports = new myLog(logsDir, logFileCommon);
