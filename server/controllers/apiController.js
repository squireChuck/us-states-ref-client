/*
    Future ideas
    GET /states/(name|abbrev)/(:name|:abbrev)/(capital|addresses|driversLicenseDescription|sampleLicense)    addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses/:index => single address
*/
var StateService = require('../services/StateService');
var stateService = new StateService();

module.exports = function(app) {

    // GET /states
    app.get('/usstates/api/v1/states', function(req, res) { 
        console.log("In the GET /usstates/api/v1/states endpoint");

        res.send(stateService.getAllStates());
    });

    // GET /states/name 
    app.get('/usstates/api/v1/states/name/:name', function(req, res) { 
        console.log("In the GET /usstates/api/v1/states/name endpoint");

        res.send(stateService.getStateByName(req.params.name));
    });

    // GET /states/abbrev 
    app.get('/usstates/api/v1/states/abbrev/:abbrev', function(req, res) { 
        console.log("In the GET /usstates/api/v1/states/abbrev endpoint");

        res.send(stateService.getStateByAbbrev(req.params.abbrev));
    });
}