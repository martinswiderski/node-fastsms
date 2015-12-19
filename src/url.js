var url,
    validate    = require('./validate'),
    querystring = require('querystring');

url = function url() {

    this.allowed = {
        'http': true,
        'https': true
    },

    /**
     * Flattens key/value array to query string
     * @param object obj       Key = value
     * @param string separator Separator string
     * @returns string
     */
    this.flattenObject = function (obj, separator) {
        if (validate.typeOf(obj) === 'Object') {
            var out = [];
            for (var k in obj) {
                out.push(k + '=' + querystring.escape(obj[k]));
            }
        }
        return out.join(separator);
    },

    /**
     * URL builder
     * @param string protocol     String expression of protocol "http"|"https"
     * @param string hostname     Hostname
     * @param string path         Root path
     * @param object getArguments Key=>Value hash
     * @returns false|string
     */
    this.build = function (protocol, hostname, path, getArguments) {
        try {

            path = !path ? '' : path;

            if (this.allowed[protocol] !== true) {
                throw new Exception('Invalid protocol choice');
            }

            if (validate.hostName(hostname) === false && validate.ipAddress(hostname) === false) {
                throw new Exception('Invalid hostname');
            }

            if (validate.typeOf(path) !== 'String') {
                throw new Exception('Invalid URL path');
            }

            if (validate.typeOf(getArguments) !== 'Object') {
                throw new Exception('Invalid GET parameters');
            }

            var out = [
                protocol,
                '://',
                hostname,
                path,
                '?',
                this.flattenObject(getArguments, '&')
            ];

            return out.join('');

        } catch (exc) {
            return false;
        }
    };
};

module.exports = new url();