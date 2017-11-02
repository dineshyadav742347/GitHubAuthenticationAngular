var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/user');
var config = require('../config/appConfig');

module.exports = function(passport)
{

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      console.log("serializeUser");
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("deserialize")
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


	passport.use(new GitHubStrategy({
	    clientID: config.gitClientID,
	    clientSecret: config.gitClientSecret,
	    callbackURL: config.gitCallbackURL
	  },
	  function(req, accessToken, refreshToken, profile, done) {

	    process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {
                User.findOne({'gitId' : profile.username }, function(err, user) {
                    if (err)
                    {
                        return done(err);
                    }

                    else if (user) 
                    {
                        return done(null, user); // user found, return that user
                    } 
                    else 
                    {
                        var newUser  = new User();
                        newUser.gitId  = profile.username;
                        newUser.gitProfile = profile.profileUrl;
                        newUser.save(function(err) {
                            if (err)
                            {
                                return done(err);
                            }
                            else
                            {
                                return done(null, newUser);
                            }
                        });
                    }
                });

            } 
            else 
            {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session
                user.gitId = profile.username;
                user.gitProfile = profile.profileUrl;
                user.save(function(err) {
                    if (err)
                    {
                        return done(err);
                    }
                    else
                    {
                        return done(null, user);
                    }
                    
                });

            }
        });

	  }
	));
}