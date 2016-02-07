#!/usr/bin/env node
/**
 * To run invoke ./send-message.js YOURMOBILE
 * mobile in format 447777112233
 */
try {

var fastSms = require(__dirname + "/../index"),
    sentId  = fastSms.sendOne(
        process.argv[2],
        "That's a test message confirming your node-fstsms is working. More: https://www.npmjs.com/package/node-fastsms",
        'MartinS'
    );

} catch (err) {
    console.log(err);
    process.exit(1);
}

if (!isNaN(sentId) && sentId > 0) {
    console.log('Message sent. ID: ' + sentId);
} else {
    console.log("Message not sent. Check errors and environment variable for FAST_SMS_API_TOKEN\nUse: \nexport FAST_SMS_API_TOKEN=''\nto set the value");
}
process.exit(0);


