var response,
    unixTime      = require('unix-time'),
    uuid          = require('uuid'),
    fs            = require('fs'),
    md5           = require('md5'),
    configuration = require('./configuration'),
    opCode        = require('./op-code'),
    actions       = require('./actions');

response = function response() {

    /**
     * Response
     * @var {object}
     */
    this.envelope = {
        version: false,
        action: '',
        error: {
            status: false,
            details: []
        },
        message: {
            id: 0,
            uuid: '',
            content: {
                md5: '',
                length: 0
            },
            timestamp: '',
            unix: 0,
            exec: 0
        },
        api: {
            code: false,
            status: ''
        },
        http: {
            code: false,
            status: ''
        },
        credits: false,
        config: {
            hostname: configuration.hostname,
            protocol: configuration.protocol,
            path: configuration.path,
            token: md5(configuration.token),
            instanceId: configuration.instanceId
        },
        persistence: {

        }
    },

    /**
     * Turns subject into INT or FALSE
     * @param string str Subject string to turn to INT or FALSE
     * @return {int|bool}
     */
    this.integerOrFalse = function (str) {
        return ('' + parseInt(str) === 'NaN') ? false : parseInt(str);
    },

    /**
     * Resolves response details
     * @param string    opType        Operation type, i.e. 'Send'
     * @param int|mixed apiReturned   API Code (negative=> error, otherwise=> messageId)
     * @param int|mixed httpCode      HTTP Code from HTTP REST Client
     * @param string    messageMd5    MD5 of the message sent
     * @param int|mixed messageLength Length of the message sent
     * @param int|mixed execTime      Execution in ms
     * @param bool     checkCredits   flag true|false checking credits
     * @param function checkCreditsFn If above is true called to fetch credits-left value
     * @returns {}
     */
    this.render = function (opType, apiReturned, httpCode, messageMd5, messageLength, execTime, checkCredits, checkCreditsFn) {

        var date        = new Date(),
            response    = JSON.parse(JSON.stringify(this.envelope));

        response.version = this.resolveModuleVersion();

        if (actions.isValid(opType) !== true) {
            throw new Error('Invalid action: ' + opType);
        }

        response.action = opType;

        checkCredits = (false === checkCredits || true === checkCredits) ? checkCredits : false;

        apiReturned = this.integerOrFalse(apiReturned),
        httpCode    = this.integerOrFalse(httpCode);
        apiReturned = (false === apiReturned) ? -1 : apiReturned;
        httpCode    = (false === httpCode) ? 0 : httpCode;

        response.message.content.md5    = messageMd5;                          // 32 chars
        response.message.content.length = messageLength;
        response.message.timestamp      = date;
        response.message.unix           = unixTime(date);                // unit-timestamp
        response.message.exec           = this.integerOrFalse(execTime);       // number
        response.message.uuid           = uuid.v1();                           // 36 chars
        response.message.id             = (apiReturned < 0) ? 0 : apiReturned; // number
        response.credits                = (checkCredits === true && (typeof checkCreditsFn) === 'function') ? checkCreditsFn() : false;

        var apiDetails  = opCode.resolve(apiReturned, 'api'),
            httpDetails = opCode.resolve(httpCode, 'http');

        response.http.code   = httpCode;
        response.http.status = httpDetails;
        response.api.code    = (apiReturned>0) ? false : apiReturned;
        response.api.status  = apiDetails;

        if (parseInt(response.http.code) > 299 || parseInt(response.http.code) < 200) {
            response.error.details.push({
                type: 'HTTP',
                code: response.http.code,
                status : response.http.status
            });
        }

        if (parseInt(response.api.code) < 0) {
            response.error.details.push({
                type: 'API',
                code: response.api.code,
                status : response.api.status
            });
        }

        if (response.error.details.length > 0) {
            response.error.status = true;
        }

        return response;
    },

    this.resolveModuleVersion = function() {
        var pckg = JSON.parse(
            fs.readFileSync(__dirname + '/../package.json').toString()
        );
        return (!pckg['version']) ? 0 : pckg['version'];
    };
};

module.exports = new response();