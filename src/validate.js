var validate,
    dateTool = require('./date-tool');

validate = function validate() {

    this.internationalMobile = function (mobile) {
        return !isNaN(mobile) && (new String(mobile)).length > 11;
    },

    this.emailAddress = function (email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);
    },

    this.ipAddress = function (ip) {
        return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip));
    },

    this.hostName = function (host) {
        if (host === (new String(host)).replace('.', '')) {
            return false;
        }
        return (/^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(host));
    },

    this.scheduledDate = function (date) {
        return (dateTool.reformatDateIso(date) !== false);
    };

};

module.exports = new validate();