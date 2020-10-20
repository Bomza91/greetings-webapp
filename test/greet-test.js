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
        const greeting = Greetings(pool);

        await greeting.insertName("Sibo");
        await greeting.insertName("Sibo");

        const counter = await greeting.updatingCount("Sibo")


        assert.equal[ { counter: 2 } ]

    })

    it('should able to greet in English', async function () {
        let greeting = Greetings(pool);

        assert.equal("Hello, Bomkazi", await  greeting.theLanguage( "English", "Bomkazi"));

    });

        it('should able to greet in IsiXhosa', async function () {
            let greeting = Greetings(pool);

            assert.equal("Molo, Sino", await  greeting.theLanguage( "IsiXhosa", "Sino"));
        
        });

        it('should able to greet in IsiZulu', async function () {
            let greeting = Greetings(pool);

            assert.equal("Sawubona, Njunju", await  greeting.theLanguage( "IsiZulu", "Njunju")); 

        });

        after(function () {
            pool.end();
        })
    });





























