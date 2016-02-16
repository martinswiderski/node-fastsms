var fastsms,
    valid         = require('./validate'),
    dateTool      = require('./date-tool'),
    url           = require('./url'),
    md5           = require('md5'),
    request       = require('sync-request'),
    opCode        = require('./op-code'),
    myLog         = require('./my-log'),
    response      = require('./response'),
    configuration = require('./configuration');

fastsms = function fastsms() {

    /**
     * Sends a message with defined validity and can be scheduled at specific time
     *
     * @param string destination Number in format similar to 447000345678
     * @param string body        Text message
     * @param string source      Sending party name or number
     * @param string validity    Optional - TTL in seconds e.g. 86400 = 24 hours (default 24 hr)
     * @param bool   check       Optional - status check
     * @param string schedule    Optional - Target timestamp for send the message, format: YYYYMMDDHHMMSS
     *
     * @returns {object} response
     * @see response-spec
     */
    this.sendOne = function (destination, body, source, validity, check, schedule) {

        var id = 0;

        try {

            if (!check || check !== true) {
                check = false;
            }

            if (valid.internationalMobile(destination) !== true) {
                throw new Error('Invalid mobile number');
            }

            if (valid.typeOf(body) !== 'String') {
                throw new Error('Invalid message body');
            }

            if (valid.typeOf(source) !== 'String' || source.length < 1 || source.length > 11) {
                throw new Error('Invalid sender (over 11 Chars)');
            }

            if (valid.typeOf(validity) === 'Undefined') {
                validity = 259200; // 3 days
            } else {
                validity = parseInt(validity);
                if (validity < 3600) {
                    throw new Error('Validity period incorrect');
                }
            }

            if (valid.typeOf(schedule) !== 'Undefined') {
                if (valid.scheduledDate(schedule) === false) {
                    throw new Error('Scheduled date incorrect');
                }
            }

            // Payload for sending message ------------------------------

            var opType  = 'Send',
                payload = {
                    Token: configuration.token,
                    Action: opType,
                    DestinationAddress: destination,
                    SourceAddress: source,
                    Body: body
                };

            if (valid.typeOf(validity) !== 'Undefined') {
                payload['ValidityPeriod'] = validity;
            }

            if (valid.typeOf(schedule) !== 'Undefined') {
                payload['ScheduleDate'] = validity;
            }

            var responseEnv = {}, // blank envelope
                uriCall = url.build(
                    configuration.protocol,
                    configuration.hostname,
                    configuration.path,
                    payload
                );

            // Mock only ------------------------------------
            if (configuration.mock === true) {

                responseEnv = response.render('Send', 654321, 200, md5(body), body.length, 123, true, function () { return 100; });
                responseEnv.message.content.source = source;
                responseEnv.message.content.target = destination;
                return responseEnv;

            } else {

                var responseStr  = '',
                    httpApiStart = 0,
                    httpApiEnd   = 0;

                httpApiStart = dateTool.microtime('float');
                resp         = request('GET', uriCall);
                httpApiEnd   = dateTool.microtime('float');

                responseStr = resp.body.toString('utf-8');
                responseEnv = response.render('Send', responseStr, resp.statusCode, md5(body), body.length, (httpApiEnd-httpApiStart), true, this.checkCredits);

                id = parseInt(responseStr);

                if (id < 0) {
                    myLog.log().error('Code: %s %s', id, opCode.resolve(id)); // @todo: consider throw new Error(msg);
                } else {
                    myLog.log().info('CREDITS LEFT: %s', responseEnv.credits); // @todo: consider delegating the check for credits to the envelope object
                    if (check === true) {
                        myLog.log().info('STATUS: %s', this.checkMessageStatus(id)); // @todo: Same story here... maybe not the right place
                    }
                }

                return responseEnv;
            }

        } catch (exc) {
            // @todo: or JSON from here
            myLog.log().error(exc);
            return 0;
        }
        return id; // @todo: This message ID must land in envelope, too w. UUID, but that is a separate concern
                   //        So needs moving up...
    },

    this.checkMessageStatus = function (id) {
        if (configuration.mock === false) {
            var payload = {
                MessageID: id,
                Token: configuration.token,
                Action: 'CheckMessageStatus'
            };

            var uriCall = url.build(
                configuration.protocol,
                configuration.hostname,
                configuration.path,
                payload
            );

            var resp   = request('GET', uriCall),
                status = (new String(resp.body.toString('utf-8'))).trim();

            return status;
        }
        return true;
    },

    this.checkCredits = function () {
        if (!this.config || !configuration.mock || configuration.mock !== false) {
            return 654321;
        }

        var payload = {
            Token: configuration.token,
            Action: 'CheckCredits'
        };

        var uriCall = url.build(
            configuration.protocol,
            configuration.hostname,
            configuration.path,
            payload
        );

        var resp    = request('GET', uriCall),
            credits = parseInt(resp.body.toString('utf-8'));

        return credits;
    },

    this.generateMockId = function () {
        var id = Math.abs(parseInt(Math.floor(Math.random() * (1 - 999)) + 1)) + 10000;
        //valid.typeOf(id);
        return id;
    },

    this.reports = function() {
        throw new Error('not implemented');
    },

    this.createUser = function() {
        throw new Error('not implemented');
    },

    this.updateCredits = function() {
        throw new Error('not implemented');
    },

    this.importContactsCsv = function() {
        throw new Error('not implemented');
    },

    this.deleteAllContacts = function() {
        throw new Error('not implemented');
    },

    this.deleteAllGroups = function() {
        throw new Error('not implemented');
    },

    this.emptyGroup = function() {
        throw new Error('not implemented');
    },

    this.deleteGroup = function() {
        throw new Error('not implemented');
    },

    this.getBgMessages = function() {
        throw new Error('not implemented');
    };

};

module.exports = new fastsms();