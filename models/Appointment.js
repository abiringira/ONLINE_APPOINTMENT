const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ['MALE', 'FEMALE'] },
  nid: { type: String, required: true },
  province: { type: String, required: true },
  center: { type: String, required: true },
  counselor: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
