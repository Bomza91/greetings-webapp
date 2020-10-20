module.exports = function Greetings(pool) {

    var list = {};

    async function checkingNames() {
        var checking = await pool.query('select name from greet');
        return checking.rows;
    }

    async function insertName(name) {

        const item = await pool.query(`select id from greet where name=$1`, [name]);
        if (item.rowCount === 0) {
    
            await pool.query(`insert into greet(name, counter) values ($1, 0)`, [name]);
        } 
    
        await pool.query(`update greet set counter = counter+1 where name = $1`, [name]);

    }

    async function nameCheck(name) {

        var check = await pool.query('select name from greet where name =$1', [name]);

        return check;

    }

    async function getCounter() {
        let names = await pool.query('select * from greet')
        return names.rowCount;
    }

    async function theLanguage(languageClicked, nameEntered) {
        var g = await checkingNames(nameEntered);
        if (g.rowCount > 0) {
            await updatingCount(nameEntered);
        } else {
            await insertName(nameEntered);
        }

        if (languageClicked === 'English') {
            return "Hello, " + nameEntered;
        }


        if (languageClicked === 'IsiXhosa') {
            return "Molo, " + nameEntered;
        }

        if (languageClicked === 'IsiZulu') {
            return "Sawubona, " + nameEntered;
        }
    }

   
    async function updatingCount(name) {
        var name = await pool.query('SELECT counter FROM greet WHERE name=$1', [name]);       
         return name.rows;
    }

    async function reset(){
        await pool.query('delete from greet');
    }


    return {
        insertName,
        nameCheck,
        getCounter,
        theLanguage,
        checkingNames,
        updatingCount,
        reset
    }
}

