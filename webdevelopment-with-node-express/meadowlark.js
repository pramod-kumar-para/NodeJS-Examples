var express = require('express');
var app = express();
var handlebars = require('express4-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);


// In Express, the order in which routes and middleware are added is significant.
// Express will also take care of stripping query string from URL.
app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('About meadowlark Travel');
});

// app.use is the method by which express adds middleware
// custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not found');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 Internal server');
});

app.listen(app.get('port'), function () {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate');
});