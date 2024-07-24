const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema({
  festivalName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
     type: Boolean,
     default: true
 }
});

const Festival = mongoose.model("Festival", festivalSchema);

module.exports = Festival;
