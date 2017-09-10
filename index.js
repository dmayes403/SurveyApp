const express = require('express');
// this import style is using common js modules ^^ instead of import express from 'express' like we see in js files
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
        // ^^ this callback is called instantly when the user is sent back to our server
    })
);

app.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
        // specifies what info we want from google about the user
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));
// ^^ this is different this time because there is a 'code' on the url


// app.get('/', (req, res) => {
//     res.send({ hi: 'hey johnny!' });
// })
// ^^ this creates a new route handler that is watching for http requests. 
// we also have available get, put, post, patch, delete.
// Res is what's being sent back to the front end

const PORT = process.env.PORT || 5000;
// ^^ environment variables from heroku or dev port if heroku port is not defined
app.listen(PORT);
// this line is express telling *node* what port to listen to
