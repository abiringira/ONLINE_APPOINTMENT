const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  city: { type: String },
  district: { type: String },
  address: { type: String },
  name: { type: String, unique: true }
});

module.exports = mongoose.model('Center', centerSchema);
