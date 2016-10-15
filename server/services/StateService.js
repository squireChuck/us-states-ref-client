var statesList, stateAbbrevMap, stateNameMap;

function StateService() {
    // require is synchronous, but acceptable as long as there's a 
    // low expectation of the states data changing.
    console.log('Getting state info on instantiation...');
    statesList = require('../data/states');
    console.log('Got state info.');

    stateNameMap = statesList.reduce(function(map, state) {
        map[state.name] = state;
        return map;
    }, {});
    
    stateAbbrevMap = statesList.reduce(function(map, state) {
        map[state.abbrev] = state;
        return map;
    }, {});
}

StateService.prototype.getAllStates = function() {
        return statesList;
};

StateService.prototype.getStateByAbbrev = function(abbrev) {
        return stateAbbrevMap[abbrev];
};

StateService.prototype.getStateByName = function(name) {
        return stateNameMap[name];
};

module.exports = StateService;