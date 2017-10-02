const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// ^^ this pulls a model out of mongoose, because it was put in, in the user.js file
// One argument means we're trying to get something out of mongoose, two arguments means
// we're putting something into it (like in the user.js file).

passport.serializeUser((user, done) => {
    // ^^ user is the user model associated with record from database.
    done(null, user.id);
    // user.id is the oid on the mongo record, not the googleId
    // we do this instead of using googleId, because might have multiple authentications
    // such as facebook or linked in, etc

    // -- ^^ this in turn gets stuffed into a cookie automatically
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            // ^^ user is the user record/model from the database
            done(null, user)
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        // ^^ this is used to resolve "mis match url from google"
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile.id)
        // ^^ this callback is called instantly when the user is sent back to our server
        const existingUser = await User.findOne({ googleId: profile.id })
        // ^^ database functions are always asyncronous, so we must use promises
        if (existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser); // ****
            // ^^ first argument of done is the error to send back, the second argument
            // is the data we want to pass back. Done is always used to close the async request.
        } else {
            // if we don't have a user record with this userId, make a new record
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);
            // ^^ this is the user that's passed to passport.serializeUser()
            // ^^ this takes that model *instance* and saves it to the database for us
        }
    })
);