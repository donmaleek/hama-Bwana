const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  pictures: [String],
  video: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
