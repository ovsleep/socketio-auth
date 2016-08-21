const Promise = require('bluebird');
const request = require('request');

function doHttpLogin(usr, pass, callback) {
    request.post(
        process.env.LOGIN_URL,
        {
            form: {
                usr: usr, 
                pass: pass
            }
        },
        function (error, response, body) { //Do the request to get the tkn
            if (!error && response.statusCode == 200) {
                var tkn = JSON.parse(body).token;
                callback(false, tkn);
            }
            else {
                callback(error);
            }
        });
}

module.exports = function (usr, pass) {
    return new Promise(function (resolve, reject) {
        doHttpLogin(usr, pass, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data)
            }
        });
    });
}
