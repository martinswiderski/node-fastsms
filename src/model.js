
var configuration = require('./configuration'),
    actions = require('./actions');

var model = function model() {

    this.Send = {
        Token: configuration.token,
        Action: 'Send',
        DestinationAddress: '',
        SourceAddress: '',
        Body: ''
    },

    this.get = function (name) {

        if (actions.isValid(name) !== true) {
            return false;
        }
        var out = {
            Token: this.Token
        };
        if (this[name]) {
            out = this[name];
        }
        return out;
    };
};

module.exports = new model();