var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// express relies on a middle ware to handle static files and views.
// The static middleware allows you to designate one or more directories
// as containing static resources that are simply to be delivered to the 
// client without any special handling.
// has to be added before any routes.
app.use(express.static(__dirname + '/public'));


// In Express, the order in which routes and middleware are added is significant.
// Express will also take care of stripping query string from URL.
app.get('/', function (req, res) {
    // Below are used to send plain response 
    // res.type('text/plain');
    // res.send('Meadowlark Travel');

    // sending hbs template
    res.render('layouts/home');
});

// Examples of dynamic views.
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];
app.get('/about', function (req, res) {
    // res.type('text/plain');
    // res.send('About meadowlark Travel');
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('layouts/about', {
        fortune: randomFortune
    });
});

// app.use is the method by which express adds middleware
// custom 404 page
app.use(function (req, res) {
    // res.type('text/plain');
    res.status(404);
    // res.send('404 Not found');
    res.render('layouts/404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500 Internal server');
    res.render('layouts/500');
});

app.listen(app.get('port'), function () {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate');
});