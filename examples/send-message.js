#!/usr/bin/env node
/**
 * To run invoke ./send-message.js YOURMOBILE
 * mobile in format 447777112233
 */
try {

var config   = require(__dirname + "/../src/configuration"),
    fastSms  = require(__dirname + "/../index"),
    response = require(__dirname + "/../src/response");

    fastSms.setConfig(config);

    var envelope  = fastSms.sendOne(
        process.argv[2],
        "That's a test message confirming your node-fastsms ver. " + response.resolveModuleVersion() + " worked at " + new Date() + ". For more: https://www.npmjs.com/package/node-fastsms",
        'codebloke'
    );

    console.log('FULL ENVELOPE');
    console.log(JSON.stringify(envelope, null, 4));

} catch (err) {
    console.log(err);
    process.exit(1);
}

if (!isNaN(envelope.message.id) && envelope.message.id > 0) {
    console.log('Message sent. ID: ' + envelope.message.id);
} else {
    console.log("Message not sent. Check errors and environment variable for FAST_SMS_API_TOKEN\nUse: \nexport FAST_SMS_API_TOKEN=''\nto set the value");
}
process.exit(0);


