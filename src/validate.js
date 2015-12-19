var validate,
    dateTool = require('./date-tool');

validate = function validate() {

    this.internationalMobile = function (mobile) {
        return !isNaN(mobile) && (new String(mobile)).length > 11;
    },

    this.scheduledDate = function (date) {
        return (dateTool.reformatDate(date) !== false);
    };

};

module.exports = new validate();