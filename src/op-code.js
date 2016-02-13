var opCode = function opCode() {

    /**
     * These are HTTP Codes
     * in @key {int}: @value {string}
     */
    this.httpCode = {
        '100': 'Continue',
        '101': 'Switching Protocols',
        '102': 'Processing (WebDAV; RFC 2518)',
        '200': 'OK',
        '201': 'Created',
        '202': 'Accepted',
        '203': 'Non-Authoritative Information (since HTTP/1.1)',
        '204': 'No Content',
        '205': 'Reset Content',
        '206': 'Partial Content (RFC 7233)',
        '207': 'Multi-Status (WebDAV; RFC 4918)',
        '208': 'Already Reported (WebDAV; RFC 5842)',
        '226': 'IM Used (RFC 3229)',
        '300': 'Multiple Choices',
        '301': 'Moved Permanently',
        '302': 'Found',
        '303': 'See Other (since HTTP/1.1)',
        '304': 'Not Modified (RFC 7232)',
        '305': 'Use Proxy (since HTTP/1.1)',
        '306': 'Switch Proxy',
        '307': 'Temporary Redirect (since HTTP/1.1)',
        '308': 'Permanent Redirect (RFC 7538)',
        '400': 'Bad Request',
        '401': 'Unauthorized (RFC 7235)',
        '402': 'Payment Required',
        '403': 'Forbidden',
        '404': 'Not Found',
        '405': 'Method Not Allowed',
        '406': 'Not Acceptable',
        '407': 'Proxy Authentication Required (RFC 7235)',
        '408': 'Request Timeout',
        '409': 'Conflict',
        '410': 'Gone',
        '411': 'Length Required',
        '412': 'Precondition Failed (RFC 7232)',
        '413': 'Payload Too Large (RFC 7231)',
        '414': 'URI Too Long (RFC 7231)',
        '415': 'Unsupported Media Type',
        '416': 'Range Not Satisfiable (RFC 7233)',
        '417': 'Expectation Failed',
        '418': 'I\'m a teapot (RFC 2324)',
        '419': 'Authentication Timeout (not in RFC 2616)',
        '421': 'Misdirected Request (RFC 7540)',
        '422': 'Unprocessable Entity (WebDAV; RFC 4918)',
        '423': 'Locked (WebDAV; RFC 4918)',
        '424': 'Failed Dependency (WebDAV; RFC 4918)',
        '426': 'Upgrade Required',
        '428': 'Precondition Required (RFC 6585)',
        '429': 'Too Many Requests (RFC 6585)',
        '431': 'Request Header Fields Too Large (RFC 6585)',
        '500': 'Internal Server Error',
        '501': 'Not Implemented',
        '502': 'Bad Gateway',
        '503': 'Service Unavailable',
        '504': 'Gateway Timeout',
        '505': 'HTTP Version Not Supported',
        '506': 'Variant Also Negotiates (RFC 2295)',
        '507': 'Insufficient Storage (WebDAV; RFC 4918)',
        '508': 'Loop Detected (WebDAV; RFC 5842)',
        '510': 'Not Extended (RFC 2774)',
        '511': 'Network Authentication Required (RFC 6585)',
        '420': 'Method Failure',
        '450': 'Blocked by Windows Parental Controls (Microsoft)',
        '498': 'Invalid Token/Token Required',
        '509': 'Bandwidth Limit Exceeded (Apache Web Server/cPanel)',
        '440': 'Login Timeout',
        '449': 'Retry With',
        '451': 'Redirect',
        '444': 'No Response',
        '495': 'SSL Certificate Error',
        '496': 'SSL Certificate Required',
        '497': 'HTTP Request Sent to HTTPS Port',
        '499': 'Client Closed Request',
        '520': 'Unknown Error',
        '521': 'Web Server Is Down',
        '522': 'Connection Timed Out',
        '523': 'Origin Is Unreachable',
        '524': 'A Timeout Occurred',
        '525': 'SSL Handshake Failed',
        '526': 'Invalid SSL Certificate',
        '0': 'Not defined'
    },

    /**
     * These are specific errors
     * as per FastSMS definition
     * in @key {int}: @value {string}
     */
    this.apiError = {
        '-100': 'Not Enough Credits',
        '-101': 'Invalid CreditID',
        '-200': 'Invalid Contact',
        '-300': 'General Database Error',
        '-301': 'Unknown Error',
        '-302': 'Return XML Error',
        '-303': 'Received XML Error',
        '-400': 'Some numbers in list failed',
        '-401': 'Invalid Destination Address',
        '-402': 'Invalid Source Address – Alphanumeric too long',
        '-403': 'Invalid Source Address – Invalid Number',
        '-404': 'Blank Body',
        '-405': 'Invalid Validity Period',
        '-406': 'No Route Available',
        '-407': 'Invalid Schedule Date',
        '-408': 'Distribution List is Empty',
        '-409': 'Group is Empty',
        '-410': 'Invalid Distribution List',
        '-411': 'You have exceeded the limit of messages you can send in a single day to a single number',
        '-412': 'Number is blacklisted',
        '-501': 'Unknown Username/Password',
        '-502': 'Unknown Action',
        '-503': 'Unknown Message ID',
        '-504': 'Invalid From Timestamp',
        '-505': 'Invalid To Timestamp',
        '-506': 'Source Address Not Allowed (Email2SMS)',
        '-507': 'Invalid/Missing Details',
        '-508': 'Error Creating User',
        '-509': 'Unknown/Invalid User',
        '-510': 'You cannot set a user’s credits to be less than 0',
        '-511': 'The system is down for maintenance',
        '-512': 'User Suspended',
        '-513': 'License in use',
        '-514': 'License expired',
        '-515': 'No License available',
        '-516': 'Unknown List',
        '-517': 'Unable to create List',
        '-601': 'Unknown Report Type',
        '-701': 'No UserID Specified',
        '-702': 'Invalid Amount Specified',
        '-703': 'Invalid Currency Requested',
        '-1': 'Not defined'
    },

    /**
     * Resolves codes and returns envelope
     * @param {int} httpCode HTTP code
     * @param {int} apiCode  API code
     * @return {object}
     */
    this.resolve = function (httpCode, apiCode) {

        apiCode  = (this.integerOrFalse(apiCode) === false) ? -1 : parseInt(apiCode);
        httpCode = (this.integerOrFalse(httpCode) === false) ? 0 : parseInt(httpCode);

        var apiDetails  = (this.apiError[apiCode]) ? 'API Error: ' + this.apiError[apiCode] : false,
            httpDetails = (this.httpCode[httpCode]) ? 'HTTP Status: ' + this.httpCode[httpCode] : false,
            response    = {
                api: {
                    code: (false === apiDetails) ? false : apiCode,
                    status: apiDetails
                },
                http: {
                    code: httpCode,
                    status: httpDetails
                }
            };
        return response;
    },

    /**
     * Checks string and if it's possible to cast type to INT then it returns integer
     * otherwise it returns false
     * @param string str String to examine
     * @return {bool|int}
     */
    this.integerOrFalse = function (str) {
        return ('' + parseInt(str) === 'NaN') ? false : parseInt(str);
    };
};

module.exports = new opCode();
