const assert = require('assert');
const pg = require("pg");
const Greetings = require('../greetings');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://bomkazi:codex@123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

describe('Greetings web-app', function () {

    it('should able to insert a name', async function () {

        const greet = Greetings(pool);
        // var theNames = greet.theLanguage("IsiXhosa", "Bomkazi")

        // assert.equal('Molo, Bomkazi', await greet.insertName());

    });

    it('should able to greet in English', async function () {
        let greet = Greetings(pool);

        assert.equal("Hello, Bomkazi", await  greet.theLanguage( "English", "Bomkazi"));

    });

        it('should able to greet in IsiXhosa', async function () {
            let greet = Greetings(pool);

            assert.equal("Molo, Sino", await  greet.theLanguage( "IsiXhosa", "Sino"));
        
        });

        it('should able to greet in IsiZulu', async function () {
            let greet = Greetings(pool);

            assert.equal("Sawubona, Njunju", await  greet.theLanguage( "IsiZulu", "Njunju")); 

        });

        // it('should able to count how many people that were greeted', async function () {

        //     let greet = Greetings(pool);

        //     greet.getCounter("Bomkazi", "English");
        //     greet.getCounter("Sino", "English");
            
            
        //             assert.equal(2, greet.getCounter());

        // });

        it('should able to reset the counter', async function () {
            let greetings = Greetings(pool);
            
        });



        after(function () {
            pool.end();
        })
    });





























// const assert = require('assert');
// let Greet = require("../greetings");

// describe("Greetings exercise", function () {
//     it("should be able to set names", function () {
//         let greetings = Greet();
//         var theNames = greetings.theLanguage("IsiXhosa", "Bomkazi")


//         assert.equal(theNames, 'Molo, Bomkazi');

//     })

//     it("should be able to greet a person in English", function () {
//         let greetings = Greet();
//         var message = greetings.theLanguage('English', 'Bomkazi')

//         assert.equal(message, "Hello, Bomkazi");
//     })

//     it("should be able to greet a person in IsiXHosa", function () {
//         let greetings = Greet();
//         var message = greetings.theLanguage('IsiXhosa', 'Bomkazi')

//         assert.equal(message, "Molo, Bomkazi");
//     })

//     it("should be able to greet a person in IsiZulu", function () {
//         let greetings = Greet();
//         var message = greetings.theLanguage('IsiZulu', 'Bomkazi')

//         assert.equal(message, "Sawubona, Bomkazi");
//     })

//     it("should count how many names that have been entered", function () {
//         let greetings = Greet();

//         greetings.setTheName("English", "Bomkazi");
//         greetings.setTheName("Isixhosa", "Bomkazi");


//         assert.equal(2, greetings.counter());
//     })
// });



















// // const assert = require('assert');
// // let Greet = require("../greetings");

// // describe("Greetings exercise", function () {
// //     it("should be able to set names", function () {
// //         let greetings = Greet();
// //         var theNames = greetings.theLanguage("IsiXhosa", "Bomkazi")


// //         assert.equal(theNames, 'Molo, Bomkazi');

// //     })

// //     it("should be able to greet a person in English", function () {
// //         let greetings = Greet();
// //         var message = greetings.theLanguage('English', 'Bomkazi')

// //         assert.equal(message, "Hello, Bomkazi");
// //     })

// //     it("should be able to greet a person in IsiXHosa", function () {
// //         let greetings = Greet();
// //         var message = greetings.theLanguage('IsiXhosa', 'Bomkazi')

// //         assert.equal(message, "Molo, Bomkazi");
// //     })

// //     it("should be able to greet a person in IsiZulu", function () {
// //         let greetings = Greet();
// //         var message = greetings.theLanguage('IsiZulu', 'Bomkazi')

// //         assert.equal(message, "Sawubona, Bomkazi");
// //     })

// //     it("should count how many names that have been entered", function () {
// //         let greetings = Greet();

// //         greetings.setTheName("English", "Bomkazi");
// //         greetings.setTheName("Isixhosa", "Bomkazi");


// //         assert.equal(2, greetings.counter());
// //     })
// // });

