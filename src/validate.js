var validate;

validate = function validate() {

    this.internationalMobile = function (mobile) {
        var str = new String(mobile);
        return !isNaN(mobile) && str.length > 11;
    },

    this.scheduledDate = function (date) {

    };

};

module.exports = new validate();