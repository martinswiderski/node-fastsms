var fastsms,
    //configuration = require('./configuration'),
    valid         = require('./validate'),
    url           = require('./url'),
    request       = require('sync-request'),
    errorCode     = require('./error-code'),
    myLog         = require('./my-log');

fastsms = function fastsms() {

    this.config = {};

    this.setConfig = function (config) {
        this.config = config; // explicit set method
        return this;
    },

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
     * @returns {int} Message ID 0=Error
     */
    this.sendOne = function (destination, body, source, validity, check, schedule) {

        var id = 0;

        try {

            if (!check || check !== true) {
                check = false;
            }

            if (valid.internationalMobile(destination) !== true) {
                throw ('Invalid mobile number');
            }

            if (valid.typeOf(body) !== 'String') {
                throw ('Invalid message body');
            }

            if (valid.typeOf(source) !== 'String' || source.length < 1 || source.length > 11) {
                throw ('Invalid sender (over 11 Chars)');
            }

            if (valid.typeOf(validity) === 'Undefined') {
                validity = 259200; // 3 days
            } else {
                validity = parseInt(validity);
                if (validity < 3600) {
                    throw ('Validity period incorrect');
                }
            }

            if (valid.typeOf(schedule) !== 'Undefined') {
                if (valid.scheduledDate(schedule) === false) {
                    throw ('Scheduled date incorrect');
                }
            }

            // Payload for sending message ------------------------------

            var payload = {
                Token: this.config.token,
                Action: 'Send',
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

            var uriCall = url.build(
                this.config.protocol,
                this.config.hostname,
                this.config.path,
                payload
            );

            // Mock only ------------------------------------

            if (this.config.mock === true) {
                var _id = this.generateMockId(),
                    obj = {
                        url: uriCall,
                        payload: payload
                    };
                this.config.messages[_id] = obj;
                return parseInt(_id);
            } else {
                var resp = request('GET', uriCall);

                id   = parseInt(resp.body.toString('utf-8'));

                if (id < 0) {
                    myLog.log().error('Code: %s %s', id, errorCode.resolve(id));
                } else {
                    myLog.log().info('CREDITS LEFT: %s', this.checkCredits());
                    if (check === true) {
                        myLog.log().info('STATUS: %s', this.checkMessageStatus(id));
                    }
                }
            }

        } catch (exc) {
            myLog.log().error(exc);
            return 0;
        }

        return id;
    },

    this.checkMessageStatus = function (id) {
        if (this.config.mock === false) {
            var payload = {
                MessageID: id,
                Token: this.config.token,
                Action: 'CheckMessageStatus'
            };

            var uriCall = url.build(
                this.config.protocol,
                this.config.hostname,
                this.config.path,
                payload
            );

            var resp   = request('GET', uriCall),
                status = (new String(resp.body.toString('utf-8'))).trim();

            return status;
        }
        return true;
    },

    this.checkCredits = function () {
        if (this.config.mock === false) {
            var payload = {
                Token: this.config.token,
                Action: 'CheckCredits'
            };

            var uriCall = url.build(
                this.config.protocol,
                this.config.hostname,
                this.config.path,
                payload
            );

            var resp    = request('GET', uriCall),
                credits = parseInt(resp.body.toString('utf-8'));

            return credits;
        }

        return -1;
    },

    this.generateMockId = function () {
        var id = Math.abs(parseInt(Math.floor(Math.random() * (1 - 999)) + 1)) + 10000;
        //valid.typeOf(id);
        return id;
    },

    this.reports = function() {
        return 'not implemented';
    },

    this.createUser = function() {
        return 'not implemented';
    },

    this.updateCredits = function() {
        return 'not implemented';
    },

    this.importContactsCsv = function() {
        return 'not implemented';
    },

    this.deleteAllContacts = function() {
        return 'not implemented';
    },

    this.deleteAllGroups = function() {
        return 'not implemented';
    },

    this.emptyGroup = function() {
        return 'not implemented';
    },

    this.deleteGroup = function() {
        return 'not implemented';
    },

    this.getBgMessages = function() {
        return 'not implemented';
    };

};

module.exports = new fastsms();