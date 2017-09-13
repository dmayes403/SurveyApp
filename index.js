const express = require('express');
// this import style is using common js modules ^^ instead of import express from 'express' like we see in js files
require('./services/passport');
// ^^ not assigning to a variable, because passport.js isn't exporting anything. But this is required
// in at least one location for passport.js to actually run. Section 4, Lecture 28, 6:30

const app = express();

require('./routes/authRoutes')(app);
// ^^ this passes in the app object from line 7 to be used in the authRoute functions.
// Because when we require the authRoutes file, it returns a function, and then that
// function is immediately called with the app object.

const PORT = process.env.PORT || 5000;
// ^^ environment variables from heroku or dev port if heroku port is not defined
app.listen(PORT);
// this line is express telling *node* what port to listen to
