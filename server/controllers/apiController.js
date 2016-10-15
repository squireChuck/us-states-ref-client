/*
    REST ideas
    GET /states => all state obj's
    GET /states/name/:name => info on state with name
    GET /states/abbrev/:abbrev => info on state with abbrev
    GET /states/(name|abbrev)/(:name|:abbrev)/(capital|addresses|driversLicenseDescription|sampleLicense)    addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses => all addresses
    GET /states/(name|abbrev)/(:name|:abbrev)/addresses/:index => single address
*/
module.exports = function(app) {

    // GET endpoint
    app.get('/app/api/v1/', function(req, res) { 
        // This log shows up in the console running node (since this is server side code).
        console.log("In the GET /app/api/v1 endpoint");

        // Return json in the response.
        res.send(statesList[0]);
    });

    // Second GET endpoint
    app.get('/app/api/v1/text', function(req, res) { 
        res.send({"textMessage": "you rock! :D :D :D"});
    });

    // POST endpoint
    app.post('/app/api/v1', function(req, res) { 
        var reqData = req.body;
        // This log shows up in the console running node (since this is server side code).
        console.log(JSON.stringify(reqData));
        
        var name = req.body.name;
        var myCount = parseInt(req.body.count) + 11;

        res.send({
            'name' : name, // Should be the same as what was in the POST request.
            // Should be different than the POST request.
            'myCount': myCount 
        });
    });
}