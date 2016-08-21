const dotenv = require('dotenv');
dotenv.load();

var Sensor = require('./sensor-mock');
const Socket = require('./socket');
const login = require('./login');

login(process.env.USER, process.env.PASSWORD) //we use the HTTP login to get the token
    .then((token) => {
        socket = new Socket(token); //connect the socket using the generated token
        socket.connect().then(() => {
            sensor = new Sensor(); //starts the sensor
            setInterval(() => {
                sensor.read().then((data) => { //reads the sensor data
                    socket.sendData(data); //send the sensor data through the socket to the server
                })
            }, process.env.SENSOR_INTERVAL);
        })
    });
