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
    }
};

module.exports = new dateTool();