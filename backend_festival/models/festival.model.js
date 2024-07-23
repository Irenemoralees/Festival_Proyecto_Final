const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
   
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;