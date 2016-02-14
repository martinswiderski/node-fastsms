var response,
    fs            = require('fs'),
    configuration = require('./configuration'),
    opCode        = require('./op-code');

response = function response() {

    /**
     * Response
     * @var {object}
     */
    this.envelope = {
        version: false,
        error: {
            status: false,
            details: []
        },
        message: {
            id: 0,
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
            token: 'Check your FAST_SMS_API_TOKEN',
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
     * @param int|mixed apiReturned   API Code (negative=> error, otherwise=> messageId)
     * @param int|mixed httpCode      HTTP Code from HTTP REST Client
     * @param string    messageMd5    MD5 of the message sent
     * @param int|mixed messageLength Length of the message sent
     * @param int|mixed execTime      Execution in ms
     * @param bool     checkCredits   flag true|false checking credits
     * @param function checkCreditsFn If above is true called to fetch credits-left value
     * @returns {}
     */
    this.render = function (apiReturned, httpCode, messageMd5, messageLength, execTime, checkCredits, checkCreditsFn) {

        var response    = JSON.parse(JSON.stringify(this.envelope));

        response.version = this.resolveModuleVersion();

        checkCredits = (false === checkCredits || true === checkCredits) ? checkCredits : false;

        apiReturned = this.integerOrFalse(apiReturned),
        httpCode    = this.integerOrFalse(httpCode);
        apiReturned = (false === apiReturned) ? -1 : apiReturned;
        httpCode    = (false === httpCode) ? 0 : httpCode;

        response.message.content.md5    = messageMd5;
        response.message.content.length = messageLength;
        response.message.timestamp      = '';
        response.message.unix           = 0;
        response.message.exec           = this.integerOrFalse(execTime);
        response.message.id             = (apiReturned < 0) ? false : apiReturned;
        response.credits                = (checkCredits === true && (typeof checkCreditsFn) === 'function') ? checkCreditsFn() : false;

        var apiDetails  = (false === apiReturned) ? 'API Error: ' + opCode.resolve(apiReturned, 'api') : false,
            httpDetails = (false === httpCode) ? 'HTTP Status: ' + opCode.resolve(httpCode, 'http') : false;

        response.http.code   = httpCode;
        response.http.status = httpDetails;
        response.api.code    = (apiReturned>0) ? false : apiReturned;
        response.api.status  = (response.api.code !== false) ? apiDetails : '';

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