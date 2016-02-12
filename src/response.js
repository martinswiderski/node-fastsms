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

    /**
     * Resolves response details
     * @param int apiCode  API Code (negative) otherwise it's credits
     * @param int httpCode HTTP Code from HTTP REST Client
     * @param int remainingCredits API Credits left
     * @param int execTime Exec time in Millisecs
     * @returns {{apiDetails: *, apiCodeReturned: *, httpStatus: *, httpCode: (Number|*)}}
     */
        this.resolve = function (apiCode, httpCode, remainingCredits, execTime) {
            apiCode  = parseInt(apiCode);
            httpCode = parseInt(httpCode);

            var apiDetails  = (this.apiError[apiCode]) ? 'API Error: ' + this.apiError[apiCode] : false,
                httpDetails = (this.httpCode[httpCode]) ? 'HTTP Status: ' + this.httpCode[httpCode] : false;

            var response  = {
                error: {
                    status: false,
                    details: []
                },
                timestamp: '',
                unix: 0,
                exec: (!isNaN(execTime)) ? parseInt(execTime) : false,
                api: {
                    code: (false === apiDetails) ? false : apiCode,
                    status: apiDetails
                },
                http: {
                    code: httpCode,
                    status: httpDetails
                },
                credits: (isNaN(remainingCredits)) ? parseInt(remainingCredits) : false,
                config: {
                    hostname: configuration.hostname,
                    protocol: configuration.protocol,
                    path: configuration.path,
                    token: 'Check your FAST_SMS_API_TOKEN',
                    instanceId: configuration.instanceId
                },
                persistence: {
                }

            };

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
        };


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