describe("StateService", function() {
    var StateService = require('../../services/StateService');
    var stateService = new StateService();
    var stateAbbrevs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", 
                        "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", 
                        "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", 
                        "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", 
                        "VT", "VA", "WA", "WV", "WI", "WY"];

    var stateNames = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
                    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
                    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
                    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
                    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
                    "New Hampshire", "New Jersey", "New Mexico", "New York", 
                    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
                    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
                    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
                    "West Virginia", "Wisconsin", "Wyoming"];
 
    it("returns 50 states", function() {
        expect(stateService.getAllStates().length).toBe(50);
    });

    it("returns a state by name, case-insensitive", function() {
        expect(stateService.getStateByName('Alaska')).toBeTruthy();
        expect(stateService.getStateByName('alaska')).toBeTruthy();
        expect(stateService.getStateByName('aLaSka')).toBeTruthy();
    });

    it("returns a state by abbrev, case-insensitive", function() {
        expect(stateService.getStateByAbbrev('AK')).toBeTruthy();
        expect(stateService.getStateByAbbrev('Ak')).toBeTruthy();
        expect(stateService.getStateByAbbrev('aK')).toBeTruthy();
        expect(stateService.getStateByAbbrev('ak')).toBeTruthy();
    });

    it("returns falsy if state name or abbreviation isn't found", function() {
        expect(stateService.getStateByAbbrev('ZA')).toBeFalsy();
        expect(stateService.getStateByName('Cuzco')).toBeFalsy();
    });
});

describe("StateService returns each state", function() {
    var StateService = require('../../services/StateService');
    var stateService = new StateService();
    var stateAbbrevs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", 
                        "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", 
                        "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", 
                        "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", 
                        "VT", "VA", "WA", "WV", "WI", "WY"];

    var stateNames = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
                    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
                    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
                    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
                    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
                    "New Hampshire", "New Jersey", "New Mexico", "New York", 
                    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
                    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
                    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
                    "West Virginia", "Wisconsin", "Wyoming"];

    stateAbbrevs.forEach(
        function(abbrev) {
            it("by its abbrev - " + abbrev, function() {
                expect(stateService.getStateByAbbrev(abbrev)).toBeTruthy();
            });
        }
    );

    stateNames.forEach(
        function(name) {
            it("by its name - " + name, function() {
                expect(stateService.getStateByName(name)).toBeTruthy();
            });
        }
    );
});

describe("A state", function() {
    var StateService = require('../../services/StateService');
    var stateService = new StateService();
    var knownState = stateService.getStateByName('Alaska');
    var statesList = stateService.getAllStates();

    var stateTest = function(state) {
        it("has a name - " + state.name, function() {
            expect(state.name).toBeTruthy();
        });

        it("has an abbrev - " + state.name, function() {
            expect(state.abbrev).toBeTruthy();
        });

        it("has a capital - " + state.name, function() {
            expect(state.capital).toBeTruthy();
        });

        xit("has multiple sample addresses - " + state.name, function() {
            expect(state.addresses).toBeTruthy();
            expect(state.addresses.length).toBeGreaterThan(0);
            
            state.addresses.forEach(
                function(address) {
                    expect(address).toBeTruthy();            
                }
            );
        }).pend("Work in progress - currently gathering address info...");

        xdescribe("and each of its addresses - " + state.name, function() {
            var addresses = state.addresses;

            xit("has a street, city, state, and zip" + state.name, function() {
                addresses.forEach(function(address) {
                    expect(address.street).toBeTruthy();
                    expect(address.city).toBeTruthy();
                    expect(address.state).toBeTruthy();
                    expect(address.zip).toBeTruthy();
                }).pend("Work in progress - currently gathering address info...");   
            }).pend("Work in progress - currently gathering address info...");
        });

        it("has a drivers license description" + state.name, function() {
            expect(state.driversLicenseDescription).toBeTruthy();
            expect(state.driversLicenseDescription instanceof Array).toBe(true);
            expect(state.driversLicenseDescription.length).toBeGreaterThan(0);
        });

        it("has a sample drivers license" + state.name, function() {
            expect(state.sampleLicense).toBeTruthy();
        });
    };

    describe("with known test values", function() {
        stateTest(knownState);
    });

    describe("in the full list", function() { 
        statesList.forEach(function(stateToTest) {
            stateTest(stateToTest);
        });
    });
    
});