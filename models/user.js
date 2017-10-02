const mongoose = require('mongoose');
const { Schema } = mongoose;
// ^^ destructoring

const userSchema = new Schema({
    googleId: String,
    credits: { trype: Number, default: 0 }
});

mongoose.model('users', userSchema);
// ^^ first property is the collection we're writing to, the second is the schema/model 
// we're putting into it.
// This line also creates a new collection if one by that name isn't already there,
// and keeps writing to that collection if it does already exist.