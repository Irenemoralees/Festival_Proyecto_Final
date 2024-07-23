const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
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

const Festival = mongoose.model('Festival', festivalSchema);

module.exports = Festival;
