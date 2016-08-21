var socketIO = require('socket.io-client');

var Socket = function (tkn) {
    var token = tkn;
    var socket;
    var connected = false;

    //connect the socket
    this.connect = function () {
        return new Promise(function (resolve, reject) {
            socket = socketIO.connect(process.env.SOKET_URL);
            socket
               .on('connect', function (msg) {
                   console.log('use this tkn: ' + tkn);
                   socket.emit('authenticate', { token: tkn }); // send the jwt
               })
               .on('authenticated', function () {
                   console.log('Authenticated!!!');
                   connected = true;

                   socket.on('action', function (msg) {
                       //we can react to server orders here
                       console.log(msg);
                   })
                   
                   resolve();
               })
               .on('unauthorized', function (msg) {
                   console.log("unauthorized: " + JSON.stringify(msg.data));
                   reject(JSON.stringify(msg.data));
               })

        });
    }

    this.sendData = function (data) {
        if (!connected) {
            throw new Error('socket not connected');
        }

        socket.emit('sensor', JSON.stringify(data));
    }
}

module.exports = Socket;
