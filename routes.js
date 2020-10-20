module.exports = function route(greeted){
    var _ = require('lodash');

    async function home (req, res) {
        res.render('index');
    };

    async function langName(req, res) {
        var name = _.capitalize(req.body.nameEntered);
        var lang = req.body.language;
    
        if (lang === undefined && name === "") {
            req.flash('info', 'Please enter language and name');
            res.render('index')
            return;
        }
    
       else if (!name) {
            req.flash('info', 'Please enter your name');
            res.render('index')
            return;
        }
    
       else if (!lang) {
            req.flash('info', 'Please enter language');
            res.render('index')
            return;
        }
        // await greetings.checkingNames(name)
        //console.log(await greetings.getCounter())
        res.render('index', {
            message: await greet.theLanguage(lang, name),
            count: await greet.getCounter(),
        })
    };

    async function greetedName (req, res) {

        var name = await greet.checkingNames();
    
        res.render('greeted', {
            names: name
        })
    };
    
    async function counterFor (req, res) {
        const username = req.params.username
        const names = await greet.updatingCount(username);
      
    
         for (const action of names)
      
       var personsCounter = action.counter 
        res.render('counter', { countName: `Hello, ${username} has been greeted ${personsCounter} times` });
         
    };

    async function theReset(req, res) {

        await greet.reset();
       
           res.render('index', {
               counter: await greet.getCounter()
           })
       };


return{
    home,
    langName,
    greetedName,
    counterFor,
    theReset
}




}