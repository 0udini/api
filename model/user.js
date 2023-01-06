const { ObjectID } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    _id: ObjectID,
    name: String,
    password: String,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);
