require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const indexController = require('./controllers/indexController');
var app = express();

// Add static media to the express
app.use(express.static(__dirname + '/views/'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Express server started at port : 8080');
});

app.use('/', indexController);
