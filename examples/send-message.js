#!/usr/bin/env node
/**
 * To run invoke ./send-message.js YOURMOBILE
 * mobile in format 447777112233
 */
var fastSms = require(__dirname + "/../index"),
    sentId  = fastSms.sendOne(
        process.argv[2],
        "That's a test message confirming your node-fstsms is working. More: https://www.npmjs.com/package/node-fastsms",
        'MartinS'
    );

if (!isNaN(sentId) && sentId > 0) {
    console.log('Message sent. ID: ' + sentId);
} else {
    console.log("Message not sent. Check errors and environment variable for FAST_SMS_API_TOKEN\nUse: \nexport FAST_SMS_API_TOKEN=''\nto set the value");
}


