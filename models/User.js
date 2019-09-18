const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
  nid: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  center: { type: String, required: true }
});

// For more
// https://mongoosejs.com/docs/validation.html

module.exports = mongoose.model("User", UserSchema);
