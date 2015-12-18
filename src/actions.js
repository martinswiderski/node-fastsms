var actions;

actions = function actions() {

    this.actions = {
        CheckCredits: true,
        CheckMessageStatus: true,
        Send: true,
        Report: true,
        CreateUser: true,
        UpdateCredits: true,
        ImportContactsCSV: true,
        DeleteAllContacts: true,
        DeleteAllGroups: true
    },

    this.isValid = function (actionName) {
        return this.actions[actionName];
    };

};

module.exports = new actions();