const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String], 
    required: true,
  },
  cardImage:{
    type:String
  },
  reviews: {
    type: [String], 
    required: true,
  },
  gallery: {
    type: [String], 
    required: true,
  }
});

module.exports = mongoose.model("Perfume", perfumeSchema);
