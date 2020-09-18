const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greetFactory = require('./greetings');

const app = express();
const greetings = greetFactory();

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());



app.get('/', function (req, res) {
    res.render('index');
});


app.get("/", function (req, res) {

  
    res.render("index", {
        counter: greetings.theCounter(),
    })
});

app.post('/greet', function (req, res) {
        var name = req.body.nameEntered;
       var lang = req.body.language;

    if (!name) {
        req.flash('info', 'Please enter your name!');
        res.render('index')
        return;
    }
    greetings.setTheName(req.body.nameEntered),

        res.render('index', {
            message: greetings.theLanguage(req.body.language, req.body.nameEntered),
            count: greetings.counter(),
        })
});


app.get('/greeted', function (req, res) {
    let names = greetings.getTheName();
    res.render('greeted', {
        names: names
    })


})


app.get('/counter/:username', function (req, res) {
    let username = req.params.username
    let names = greetings.getTheName();
    let personsCounter = names[username]
    res.render('counter', {
        name: username,
        counter: personsCounter
    })


})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});




