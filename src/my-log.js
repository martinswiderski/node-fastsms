
var myLog,
    path          = require('path'),
    configuration = require('./configuration'),
    logsDir       = path.resolve(__dirname + '/../log/') + '/',
    logFileCommon = 'common.log',
    log4js        = require('log4js');

myLog = function myLog(myLogsDir, myLogFileCommon, myLogInstance, l4js) {

    this.logsDir       = myLogsDir;
    this.logFileCommon = myLogFileCommon;
    this.instance      = myLogInstance;

    this.log4js = l4js;
    this.logger = 1;

    this.log = function () {
        console.log((typeof this.logger));
        if ((typeof this.logger) === 'number') {
            this.log4js.loadAppender('file');
            this.log4js.addAppender(this.log4js.appenders.file(path.resolve(this.logsDir + '/' + this.logFileCommon)), this.instance);
            this.logger = this.log4js.getLogger(this.instance);
            this.logger.setLevel('INFO');
        }
        return this.logger;
    };
};

module.exports = new myLog(logsDir, logFileCommon, configuration.instanceId, log4js);

