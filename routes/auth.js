var express = require('express');
var router = express.Router();
var Users = require('../models/User');

/* GET home page. */
router.post('/', function (req, res) {

    var usr = req.body.usr;
    var pass = req.body.pass;
    Users.findOne({ username: usr }, function (err, user) {
        if (err) throw err;

        if (user) {
            console.log('User found');

            //TODO HASH PASSWORDS!!!!
            if (user.password == pass) {
                console.log('Password match');

                user.generateTkn().then(function (tkn) {
                    console.log(tkn);
                    res.send({ token: tkn });
                });
            }
            else {
                res.sendStatus(401);
            }
        }
        else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;
