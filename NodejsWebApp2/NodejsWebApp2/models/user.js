const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userScheme = new Schema({
    email: { type: String, required: true, unique: true },
    password: String
});

userScheme.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});
module.exports = mongoose.model("User", userScheme);