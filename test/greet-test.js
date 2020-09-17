const assert = require('assert');
let Greet = require("../greetings");

describe("Greetings exercise", function () {
    it("should be able to set names", function () {
        let greetings = Greet();
        var theNames = greetings.theLanguage("IsiXhosa", "Bomkazi")
        
        
        assert.equal(theNames, 'Molo, Bomkazi');

    })

    it("should be able to greet a person in English", function () {
        let greetings = Greet();
        var message = greetings.theLanguage('English', 'Bomkazi')
    
        assert.equal(message, "Hello, Bomkazi");
    })

    it("should be able to greet a person in IsiXHosa", function () {
        let greetings = Greet();
        var message = greetings.theLanguage('IsiXhosa', 'Bomkazi')
    
        assert.equal(message, "Molo, Bomkazi");
    })

    it("should be able to greet a person in IsiZulu", function () {
        let greetings = Greet();
        var message = greetings.theLanguage('IsiZulu', 'Bomkazi')
    
        assert.equal(message, "Sawubona, Bomkazi");
    })

    it("should count how many names that have been entered", function () {
        let greetings = Greet();

        greetings.setTheName("English", "Bomkazi");
        greetings.setTheName("Isixhosa", "Bomkazi");
     

        assert.equal(2, greetings.counter());
    })
});

