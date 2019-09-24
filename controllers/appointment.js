const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  req.assert("firstName", "First Name is required").notEmpty(); //Validate name
  req.assert("lastName", "Last Name is required").notEmpty();
  req.assert("age", "Age is required").notEmpty();
  req.assert("mobile", "Mobile Number is required").notEmpty(); //Validate age
  req.assert("email", "A valid email is required").isEmail(); //Validate email
  req.assert("gender", "Please fill in your gender").isIn(["MALE", "FEMALE"]);
  req.assert("nid", "NID is required").notEmpty();
  req.assert("province", "province is required").notEmpty();
  req.assert("center", "Center name is required").notEmpty();
  req.assert("counselor", "Enter desired counselor").notEmpty();

  if (req.validationErrors())
    return res.status(400).send(req.validationErrors()[0]);

  const appointment = new Appointment({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    nid: req.body.nid,
    province: req.body.province,
    center: req.body.center,
    counselor: req.body.counselor
  });
  try {
    console.log(appointment);
    await appointment.save();
    res.end();
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};

exports.getAppointment = async (req, res) => {
  let query = {};
  if (req.query.id) req.assert("id", "Invalid user id").isMongoId();
  if (req.query.counselor)
    req.assert("counselor", "Invalid counselor").notEmpty();

  if (req.validationErrors())
    return res.status(400).send(req.validationErrors()[0]);

  if (req.query.id) query._id = req.query.id;
  if (req.query.counselor) query.counselor = req.query.counselor;

  try {
    const results = await Appointment.find(query);
    return res.json(results);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
};
