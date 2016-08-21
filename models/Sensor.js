var mongoose = require('mongoose');
var SensorHistory = require('./SensorHistory');
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true },
    name: String,
    status: {
        temperature: Number,
        humidity: Number,
        light: Number,
        waterLevel: Number,

        watering: Boolean,

        lastWater: Date,
        lastUpdate: Date
    },
});

sensorSchema.methods.updateData = function (sensorData) {
    //save history data
    var history = new SensorHistory({
        sensorId: this._id,
        timestamp: new Date(),
        status: this.status
    });
    var sensor = this;

    return history.save().then(() => {
        sensor.status.temperature = sensorData.temperature;
        sensor.status.humidity = sensorData.humidity;
        sensor.status.light = sensorData.light;
        sensor.status.waterLevel = sensorData.waterLevel;
        sensor.status.watering = sensorData.watering;
        if (sensorData.watering) {
            sensor.lastWater = new Date();
        }
        sensor.lastUpdate = new Date();

        sensor.save().then(function () {
            console.log('data saved');
        });
    });
}

var Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;