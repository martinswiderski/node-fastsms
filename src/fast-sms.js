var fastsms,
    configuration = require("./configuration");

fastsms = function fastsms(configuration) {

    this.config = configuration;

    /**
     * Sends a message with defined validity and can be scheduled at specific time
     *
     * @param string destination Number in format similar to 447000345678
     * @param string body        Text message
     * @param string source      Sending party name or number
     * @param string validity    Optional - TTL in seconds e.g. 86400 = 24 hours (default 24 hr)
     * @param string schedule    Optional - Target timestamp for send the message, format: YYYYMMDDHHMMSS
     *
     * @returns {number} Message ID
     */
    this.sendOne = function (destination, body, source, validity, schedule) {

        var id = 0;


        return id;
    };

};

module.exports = new fastsms();