const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFactory = require('./greetings');

const app = express();
const greetings = greetFactory();

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function (req, res) {
    res.render('index');
});

app.post('/greet', function (req, res) {
    //    var name = req.body.nameEntered;
    //    var lang = req.body.language;
    greetings.setTheName(req.body.nameEntered),



        res.render('index', {
            message: greetings.theLanguage(req.body.language, req.body.nameEntered),
            count: greetings.counter(),


        })
});

    //  app.get('/counter', function (req, res) {

      
    
    // })

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});