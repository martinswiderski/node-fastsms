#!/usr/bin/env node
/**
 * To run invoke ./send-message.js YOURMOBILE
 * mobile in format 447777112233
 */
var fastSms = require(__dirname + "/../src/fast-sms").setConfig(require(__dirname + "/../src/configuration")),
    sentId  = fastSms.sendOne(process.argv[2], "That's one small step for a man, one giant leap for mankind", 'TestMessage');

if (!isNaN(sentId) && sentId > 0) {
    console.log('Message sent. ID: ' + sentId);
} else {
    console.log("Message not sent. Check environment variables for FAST_SMS_API_TOKEN\nUse: \nexport FAST_SMS_API_TOKEN=''\nto set the value");
}


