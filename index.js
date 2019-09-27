const express = require('express');
const bodyParser = require('body-parser');
const Route = require('./routes/route');
// Requiring passport as we've configured it
const passport = require('passport');
const passportJwt = require("./middleware/passport-jwt");

const app = express();

// middleware: allow cross origin end to end
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, auth-token,Authorization, X-Requested-With",);
    next();
});
app.use(bodyParser.json());
//parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
passport.use('jwt', passportJwt);


app.get('/', function (req, res) {
    res.json({message: 'Express is up!'});
});
app.use('/api', Route);

// start the app
app.listen(3000, function () {
    console.log('Express is running on port 3000');
});