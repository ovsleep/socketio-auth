//This is just a mock for a humidity/temperature sensor
var Promise = require('bluebird');

var Sensor = function () {

    this.read = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                dataParsed = {
                    temp: Math.floor((Math.random() * 10) + 17),
                    hum: Math.floor((Math.random() * 100) + 1)
                }

                resolve(dataParsed);
            }, 2000);
        });
    }
}

module.exports = Sensor;