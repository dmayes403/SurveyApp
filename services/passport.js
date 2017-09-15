const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// ^^ this pulls a model out of mongoose, because it was put in, in the user.js file
// One argument means we're trying to get something out of mongoose, two arguments means
// we're putting something into it (like in the user.js file).

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // ^^ this callback is called instantly when the user is sent back to our server
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                // ^^ database functions are always asynchronus, so we must use promises
                if (existingUser) {
                    // we already have a record with the given profile ID
                } else {
                    // we don't have a user record with this userId, make a new record
                    new User({ googleId: profile.id }).save();
                }
            })
        // ^^ this takes that model *instance* and saves it to the database for us
    })
);