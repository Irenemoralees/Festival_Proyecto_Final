const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
   name: {
        type: String,
   },
   image: {
        type: String,
   },
   description: {
        type: String,
   },
   video: {
        type: String,
   }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
