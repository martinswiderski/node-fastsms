var response,
    configuration = require('./configuration'),
    errorCode     = require('./error-code');

response = function response() {

    /**
     * Response
     * @var {object}
     */
    this.envelope = {
        isError: false,
        responseCode: 0,
        creditsLeft: 0,
        messageUID: '',
        moduleVersion: '',
        executionDetails: {
            host: configuration.host,
            protocol: configuration.protocol,
            timestamp: '',
            timestampUnix: 0,
            msExec: 0
        },
        persistence: {
        }
    },

    this.resolveModuleVersion = function() {
        var package = JSON.parse(__dirname + '/../package.json');
        return (package['version']) ? package['version'] : 0;
    },

    /**
     * Full response returned
     * @param int httpCode        HTTP Response code, if non-200 it's an error
     * @param int messageReturned Message returned (if negative it's error)
     * @returns {object}
     */
    this.returnResponse = function(httpCode, messageReturned) {
        httpCode        = parseInt(httpCode);
        messageReturned = parseInt(messageReturned);
        var out         = JSON.parse(JSON.stringify(this.envelope)),
            errCode     = errorCode.resolve(messageReturned);

        out.responseCode = errCode;

        return out;
    };
};

module.exports = new response();