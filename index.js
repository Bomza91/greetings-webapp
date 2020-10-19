const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require('./greetings');
const pg = require("pg");
const Pool = pg.Pool;

var _ = require('lodash');

const app = express();

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const connectionString = process.env.DATABASE_URL || 'postgresql://bomkazi:codex@123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});
const greet = Greetings(pool);


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());



app.get('/', async function (req, res) {
    res.render('index');
});


// app.get("/", function (req, res) {


//     res.render("index", {
//         counter: greet.theCounter(),
//     })
// });

app.post('/greet', async function (req, res) {
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
});


app.get('/greeted', async function (req, res) {

    var name = await greet.checkingNames();

    res.render('greeted', {
        names: name
    })
});


app.get('/counter/:username', async function (req, res) {
    const username = req.params.username
    const names = await greet.updatingCount(username);
  

     for (const action of names)
  
   var personsCounter = action.counter 
    res.render('counter', { countName: `Hello, ${username} has been greeted ${personsCounter} times` });
     
});

app.get('/reset', async function (req, res) {

 await greet.reset();

    res.render('index', {
        counter: await greet.getCounter()
    })
});




// app.post("/counter/: username",  function (req, res) {

//     console.log(req.body);

//     const sql = "insert into greet ( name, counter ) values ($1, $2,);"

//     const personsData = req.body;

//     await pool.query(sql, [
//         personsData.name,
//         personsData.counter,
//     ])

//     res.redirect('/counter')
// });

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});












