module.exports = function Greetings(pool) {

    var list = {};

    async function checkingNames() {
        var checking = await pool.query('select name from greet');
        return checking.rows;
    }

    async function insertName(name) {
        // let check_user = await pool.query('Select name from db_name where name = $1')
        // if the  name is not in the databased, the insert that name
        // let insert = await pool.query('insert into greet(name, counter) values ($1, $2)', [name, 1])
        // return insert.rows;
        //else if the name already exists, just update the counter of that user

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

    // function errorMessage(languageClicked, nameEntered) {
    //     var message = "";
    //     if (nameEntered === "") {
    //         message = "Please enter your name!";
    //     }
    //     else if (!languageClicked) {
    //         message = "Please select language!";
    //     }
    //     return message;
    // }

    // async function counter(count) {
    //    
    //     return name.rowCount[0];
    // }

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












































// module.exports = function greetFactory() {

//     let namesList = {}

//     function setTheName(name) {

//         if(name){

//         if (namesList[name] === undefined) {
//             namesList[name] =0; 
//         }
//         namesList[name] =+ 1;
//     }
//     }
//     function getTheName() {

//         return namesList;
//     }

//     function theLanguage(languageClicked, nameEntered) {

//         if (languageClicked === 'English') {
//             return "Hello, " + nameEntered;
//         }


//         if (languageClicked === 'IsiXhosa') {
//             return "Molo, " + nameEntered;
//         }

//         if (languageClicked === 'IsiZulu') {
//             return "Sawubona, " + nameEntered;
//         }
//     }

//     function errorMessage(languageClicked, nameEntered) {
//         var message = "";
//         if (nameEntered === "") {
//             message = "Please enter your name!";
//         }
//         else if (!languageClicked) {
//             message = "Please select language!";
//         }
//         return message;
//     }

//     function counter() {
//         console.log (namesList);
//         return Object.keys(namesList).length;
//     }

//     function getCounter(names) {
//         return namesList[names]
//     }

//     return {
//         setTheName,
//         getTheName,
//         theLanguage,
//         counter,
//         errorMessage,
//         getCounter,

//     }
// }