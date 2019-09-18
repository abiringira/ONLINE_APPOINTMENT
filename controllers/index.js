const User = require("../models/User");

exports.getHomePage = (req, res) => {
  res.render("index", { title: "Counselor Appointment Application" });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

exports.createUser = async (req, res) => {
  req.assert("firstName", "First Name is required").notEmpty(); //Validate name
  req.assert("lastName", "Last Name is required").notEmpty();
  req.assert("mobile", "Mobile Number is required").notEmpty(); //Validate age
  req.assert("email", "A valid email is required").isEmail(); //Validate email
  req
    .assert("gender", "Please fill in student gender")
    .isIn(["MALE", "FEMALE"]);

  req.assert("nid", "Student ID is required").notEmpty();
  req.assert("username", "username is required").notEmpty();
  req.assert("password", "pwd name is required").notEmpty();
  req.assert("center", "center name is required").notEmpty();

  if (req.validationErrors())
    return res.status(400).send(req.validationErrors()[0]);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    nid: req.body.nid,
    username: req.body.username,
    password: req.body.password,
    center: req.body.center
  });

  try {
    await user.save();
    return res.end();
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};
