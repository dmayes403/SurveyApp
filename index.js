const express = require('express');
// this import style is using common js modules ^^ instead of import express from 'express' like we see in js files
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user');
// ^^ sense we're not assigning it to a variable, it will be called when the app first boots up
require('./services/passport');
// ^^ not assigning to a variable, because passport.js isn't exporting anything. But this is required
// in at least one location for passport.js to actually run. Section 4, Lecture 28, 6:30
// -- ^^ order matters between the require statements. Because passport uses the user model, the user model must
// be loaded first.

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // ^^ this is equal to: 30 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds.
        // Sense it has to be in miliseconds
        keys: [keys.cookieKey]
        // ^^ this is used to encrypt. These two properties are required for cookies. Multiple keys are
        // allowed for multiple levels of security
    })
)
// ^^ this tells express that it needs to make use of cookies inside of our application

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// ^^ this passes in the app object from line 7 to be used in the authRoute functions.
// Because when we require the authRoutes file, it returns a function, and then that
// function is immediately called with the app object.

const PORT = process.env.PORT || 5000;
// ^^ environment variables from heroku or dev port if heroku port is not defined
app.listen(PORT);
// this line is express telling *node* what port to listen to
