const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    token: String,
    tokenExpiration: Date
});

userSchema.methods.generateTkn = function () {
    //Get the token
    var profile = {
        name: this.name,
        username: this.username,
        admin: this.admin,
        id: this._id
    };

    //sign the token with jwt
    var token = jwt.sign(profile, process.env.AUTH0_CLIENT_SECRET, { expiresIn: 3600 }); //expires in 1 hour

    //save the token in the DB
    var expirationDate = moment().add(2, 'hours');
    this.token = token;
    this.tokenExpiration = expirationDate;

    return this.save().then(function (doc) {
        return token;
    });

}

var User = mongoose.model('User', userSchema);

module.exports = User;