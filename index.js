const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greetFactory = require('./greetings');
const pg = require("pg");
const Pool = pg.Pool;

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
const greetings = greetFactory(pool);


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
//         counter: greetings.theCounter(),
//     })
// });

app.post('/greet', async function (req, res) {
        var name = req.body.nameEntered;
       var lang = req.body.language;

    if (!name) {
        req.flash('info', 'Please enter your name!');
        res.render('index')
        return;
    }
 // await greetings.checkingNames(name)
//console.log(await greetings.getCounter())
        res.render('index', {
            message: await greetings.theLanguage(lang, name),
            count: await greetings.getCounter(),
        })
});


app.get('/greeted', async function (req, res) {

    var name = await greetings.checkingNames();

    res.render('greeted', {
        names: name
    })
})


app.get('/counter/:username', async function (req, res) {
    let username = req.params.username
    let names = greetings.checkingNames();
    let personsCounter = names[username]
    res.render('counter', {
        name: username,
        counter: personsCounter
    })


})


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












