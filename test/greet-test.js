const assert = require('assert');
const pg = require("pg");
const Greetings = require('../greetings');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://bomkazi:codex@123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

describe('Greetings web-app', function () {

   it("should be able to insert names to db and get user counter", async function () {
        const greet = Greetings(pool);

        await greet.insertName("Sibo");
        await greet.insertName("Sibo");

        const counter = await greet.updatingCount("Sibo")


        assert.equal[ { counter: 2 } ]

    })

    it("should be able to insert names to the db and get their counter", async function () {
        const greet = Greetings(pool);

        await greet.insertName("Bomkazi");

        const counter = await greet.getCounter("Bomkazi");
      

        assert.equal(4, counter);
    })

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


        it('should able to reset the counter', async function () {
            let greetings = Greetings(pool);
            
        });



        after(function () {
            pool.end();
        })
    });





























