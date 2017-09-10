const express = require('express');
// this import style is using common js modules ^^ instead of import express from 'express' like we see in js files
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'hey johnny!' });
})
// ^^ this creates a new route handler that is watching for http requests. 
// we also have available get, put, post, patch, delete.
// Res is what's being sent back to the front end

const PORT = process.env.PORT || 5000;
// ^^ environment variables from heroku or dev port if heroku port is not defined
app.listen(PORT);
// this line is express telling *node* what port to listen to
