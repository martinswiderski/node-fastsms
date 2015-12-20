
var configuration = require('./configuration'),
    actions = require('./actions');

model = function model() {

    this.Send = {
        Token: '',
        Action: 'Send',
        DestinationAddress: '',
        SourceAddress: '',
        Body: ''
    },

    this.get = function (name) {
        if (actions.isValid(name) !== true) {
            return false;
        }
        var out = {};
        if (this[name]) {
            out = this[name];
        }
        out.Token = configuration.token;
        return out;
    };
};

module.exports = new model();