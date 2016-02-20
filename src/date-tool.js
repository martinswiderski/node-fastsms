var moment = require('moment'),
    dateTool;

dateTool = function dateTool() {

    /**
     * Reformats input YYYYMMDDHHMMSS to YYYY-MM-DDTHH:mm:ssZ
     * @param input Date as string
     * @returns false|string
     */
    this.reformatDateIso = function (input) {
        var str = new String(input);

        if (str.length<14 || isNaN(input)) {
            return false;
        }
        var composite = [
            str.substr(0, 4),
            '-',
            str.substr(4, 2),
            '-',
            str.substr(6, 2),
            'T',
            str.substr(8, 2),
            ':',
            str.substr(10, 2),
            ':',
            str.substr(12, 2),
            'Z'
        ];
        return composite.join('');
    },

    this.reformatDateUnix = function (input) {
        var unix = 0,
            str  = this.reformatDateIso(input);
        if (str === false) {
            return str;
        } else {
            unix = moment(str).unix();
            return unix;
        }
    },

    this.isDateInTheFuture = function (input) {
        var now = moment().unix(),
            trg = this.reformatDateUnix(input);
        return trg > now;
    },

   /**
    * Gets current microtime as int or double
    * @returns int
    */
    this.microtime = function (format) {
        var allowed = {
            integer: 1,
            float: 2
        };

        if (!format || !allowed[format]) {
            return parseInt((process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000) / 1000);
        } else {
            return (allowed[format] === 1) ? parseInt((process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000) / 1000)
                                           : parseFloat((process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000) / 1000);
        }
    };
};

module.exports = new dateTool();