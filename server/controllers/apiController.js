var express = require('express');
var router = express.Router();

var StateService = require('../services/StateService');
var stateService = new StateService();

/*
    Future ideas
    GET /states/(name|abbrev)/(:name|:abbrev)/(capital|addresses|driversLicenseDescription|sampleLicense)    addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses/:index => single address
*/
// GET /states
router.get('/api/v1/states', function(req, res) { 
    console.log("In the GET /usstates/api/v1/states endpoint");

    res.send(stateService.getAllStates());
});

// GET /states/name 
router.get('/api/v1/states/name/:name', function(req, res) { 
    console.log("In the GET /usstates/api/v1/states/name endpoint");

    res.send(stateService.getStateByName(req.params.name));
});

// GET /states/abbrev 
router.get('/api/v1/states/abbrev/:abbrev', function(req, res) { 
    console.log("In the GET /usstates/api/v1/states/abbrev endpoint");

    res.send(stateService.getStateByAbbrev(req.params.abbrev));
});

module.exports = router;