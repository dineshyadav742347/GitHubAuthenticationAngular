var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();
require('./auth/passport')(passport);

var config = require('./config/appConfig');

mongoose.connect(config.mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connnected with mongo");
});


app.use('/', express.static(path.join(__dirname, '../client/dist/')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// required for passport
app.use(session({
    secret: 'github', // session secret
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/auth/github',
  passport.authenticate('github', { session: false}),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect("/#/dashboard");
});

app.get('/profile', ensureAuthenticated, function(req, res) {
  console.log("success");
  res.send({success: true, gitId: req.user.gitId, gitProfile: req.user.gitProfile});
});



//Listening to port 8081
app.listen(3000, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 3000");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({success: false});
}
