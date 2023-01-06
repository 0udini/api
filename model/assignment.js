const { ObjectID } = require('mongodb');
let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    _id: ObjectID,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    auteur:String,
    note:Number,
    remarque:String,
    boiteDeRendu:String,
});
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
