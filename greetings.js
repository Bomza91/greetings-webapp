module.exports = function greetFactory() {

    let namesList = {}

    function setTheName(name) {
        if(name){
    
        if (namesList[name] === undefined) {
            namesList[name] =0; 
        }
        namesList[name] =+ 1;
    }
    }
    function getTheName() {
        return namesList;
    }

    function theLanguage(languageClicked, nameEntered) {

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

    function errorMessage(languageClicked, nameEntered) {
        var message = "";
        if (nameEntered === "") {
            message = "Please enter your name";
        }
        else if (!languageClicked) {
            message = "Please select language";
        }
        return message;
    }

    function counter() {
        console.log (namesList);
        return Object.keys(namesList).length;
    }

    function getCounter(names) {
        return namesList[names]
    }

    return {
        setTheName,
        getTheName,
        theLanguage,
        counter,
        errorMessage,
        getCounter,

    }
}