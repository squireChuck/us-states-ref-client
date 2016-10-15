function StateService() {
    this.statesList = [];
    this.stateAbbrevMap = null;
    this.stateNameMap = null;

    // require is synchronous, but acceptable as long as there's a 
    // low expectation of the states data changing.
    console.log('Getting state info on instantiation...');
    this.statesList = require('../data/states');
    console.log('Got state info.');
}

StateService.prototype.getAllStates = function() {
    return this.statesList;
};

StateService.prototype.getStateByAbbrev = function(abbrev) {
    return this.statesList.find(function(state) {
        if(state.abbrev.toLowerCase() === abbrev.toLowerCase()) {
            return state;
        }
    });
};

StateService.prototype.getStateByName = function(name) {
    return this.statesList.find(function(state) {
        if(state.name.toLowerCase() === name.toLowerCase()) {
            return state;
        }
    });
};

module.exports = StateService;