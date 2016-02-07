> **Attention:** This Module is developed and disclosed to the public without any financial support. Purely as my attempt to support community initiatives. I would appreciate all Node.js developers using FastSMS and willing to help and contribute their time and skils to make it better.
> If you have spare time or/and energy please contact me on **codebloke@gmail.com** or leave me a message in [GitHub Issuess section](https://github.com/martinswiderski/node-fastsms/labels/help%20wanted) labelled **help wanted**. Thank you!

# [Node.js](https://nodejs.org/en/) SDK for FastSMS

[FastSMS](http://www.fastsms.co.uk/solutions/developer-api.html) is UK-based SMS messaging provider enabling RESTful API to consume their services. Since I needed to use it in my application prototype I decided that I will package the code and make it available under provisions of the [MIT license](https://opensource.org/licenses/MIT). I am not commercially associated with [Netsecrets Limited](https://beta.companieshouse.gov.uk/search/companies?q=04439226) operating the FastSMS service and software is provided under no warranty or support. Although, I am still happy to develop new features and fix bugs reported by community developers. Please feel free to contact me via Github tickets.

### Version
0.1.3 - Official NPM page is [here](https://www.npmjs.com/package/node-fastsms)

[![Build Status](https://travis-ci.org/martinswiderski/node-fastsms.svg?branch=master)](https://travis-ci.org/martinswiderski/node-fastsms)

### Tech

node-fastsms has two dependencies

* [sync-request](https://www.npmjs.com/package/sync-request) - MIT licensed REST client
* [querystring](https://github.com/Gozala/querystring) - MIT licensed string formatter

### Installation

add module to your project's **package.json** file by running

```sh
$ npm install --save node-fastsms
```
example of how to use the code is explained here:

```sh
cd examples/
./send-message.js 447777111222
```

make sure you set environment variable FAST_SMS_API_TOKEN by adding 

```sh
export FAST_SMS_API_TOKEN='your-token-here'
```




