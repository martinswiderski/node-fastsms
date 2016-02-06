process.env['FAST_SMS_API_HOSTNAME'] = 'my.fastsms.co.uk';
process.env['FAST_SMS_API_PROTOCOL'] = 'https';
process.env['FAST_SMS_API_PATH'] = '/api';
process.env['FAST_SMS_API_CLIENT_INSTANCE'] = 'fastsmsApiClient01';

/**
 * Reads from EnvVars with fall-back value
 * @param string key   Key to read value of from environment vars
 * @returns mixed
 */
function readFromEnvVars(key) {
    'use strict';
    if (process.env[key]) {
        return process.env[key];
    } else {
        throw new Error('missing required env var: ' + key);
    }
}

module.exports = {
    mock: false,
    hostname: readFromEnvVars('FAST_SMS_API_HOSTNAME', 'my.fastsms.co.uk'),
    protocol: readFromEnvVars('FAST_SMS_API_PROTOCOL', 'https'),
    path: readFromEnvVars('FAST_SMS_API_PATH', '/api'),
    token: readFromEnvVars('FAST_SMS_API_TOKEN'),
    instanceId: readFromEnvVars('FAST_SMS_API_CLIENT_INSTANCE', 'fastsmsApiClient01'),
    messages: {}
};

