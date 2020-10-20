const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require('./greetings');
const Greeted = require('./routes');
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

const routeInstant = Greeted(greet)


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());



app.get('/', routeInstant.home)


app.post('/greet', routeInstant.langName)

app.get('/greeted', routeInstant.greetedName)



app.get('/counter/:username', routeInstant.counterFor)

app.get('/reset', routeInstant.theReset)




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












