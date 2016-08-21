var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorHistory = new Schema({
    sensorId: { type: Schema.ObjectId, required: true },
    timestamp: Date,
    status: {
        temperature: Number,
        humidity: Number,
        light: Number,
        waterLevel: Number,

        watering: Boolean,

        lastWater: Date,
        lastUpdate: Date
    }
});
    
var SensorHistory = mongoose.model('SensorHistory', sensorHistory);

module.exports = SensorHistory;