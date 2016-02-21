Object.defineProperty(global, '__stack', {
    get: function(){
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack){ return stack; };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function(){
        return __stack[1].getLineNumber();
    }
});

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

