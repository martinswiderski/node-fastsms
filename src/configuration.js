/**
 * Reads from EnvVars with fall-back value
 * @param string key   Key to read value of from environment vars
 * @param string deflt Fall-back value if environment var is not set
 * @returns mixed
 */
function readFromEnvVars(key, deflt) {
    'use strict';
    if (process.env[key]) {
        return process.env[key];
    } else {
        if (deflt !== null) {
            return deflt;
        }
        console.error('Required env var %s is required', key);
        throw ('missing required env var: ' + key);
    }
}

module.exports = {
    mock: false,
    hostname: readFromEnvVars('FAST_SMS_API_HOSTNAME', 'my.fastsms.co.uk'),
    protocol: readFromEnvVars('FAST_SMS_API_PROTOCOL', 'https'),
    path: readFromEnvVars('FAST_SMS_API_PATH', '/api'),
    token: readFromEnvVars('FAST_SMS_API_TOKEN', 'not-set')
};

