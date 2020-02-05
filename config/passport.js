const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require("bcryptjs");

const User = mongoose.model("user");

const debug = false;

// local strategy is to use email and password
passport.use(
  new LocalStrategy(
    {
		usernameField: 'user[email]',
		passwordField: 'user[password]',
	},
    (email, password, done) => {
        
        User.findOne({ email })
            .then((user) => {

                if(!user) {
                    return done(null, false, {errors: {"email or password": "is invalid"}});
                }
                else{
                    bcrypt.compare(password, user.password, function(err, res) {
                        // Passwords don't match
                        if(!res) {
                            return done(null, false, {errors: {"email or password": "is invalid"}});
                        }
                        // Passwords match
                        else {
                            return done(null, user);
                        } 
                      });
                }               
            }).catch(done);
    }));