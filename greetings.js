module.exports = function greetFactory(pool) {

    
    async function checkingNames() {
        var checking = await pool.query('select name from greet');
        return checking.rows;
    }


    async function insertName(name) {
            let insert = await pool.query('insert into greet(name, counter) values ($1, $2)', [name, 1])
            return insert.rows;
    }



    async function getCounter() {
        let names = await pool.query('select * from greet')

        return names.rowCount;
    }

  async  function theLanguage(languageClicked, nameEntered) {
    var g = await checkingNames(nameEntered);
    if(g.rowCount > 0){
        await updatingCount(nameEntered);
    }else{
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

    async function updatingCount(category) {
        var name = await pool.query('update greet set counter=counter+1 where name=$1', [category]);
        return name;
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

  async  function counter() {
        console.log (names);
        return Object.keys(names).length;
    }

    // function getCounter(names) {
    //     return namesList[names]
    // }

    return {
        insertName,
        getCounter,
        theLanguage,
        checkingNames,
        updatingCount,
        counter

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