const User = require('../models/User');
const Appointment = require('../models/Appointment');

exports.getHomePage = (req, res) => {
  res.render('index', { title: 'Counselor Appointment Application' });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

exports.createUser = async (req, res) => {
  req.assert('firstName', 'First Name is required').notEmpty(); //Validate name
  req.assert('lastName', 'Last Name is required').notEmpty();
  req.assert('mobile', 'Mobile Number is required').notEmpty(); //Validate age
  req.assert('email', 'A valid email is required').isEmail(); //Validate email
  req.assert('gender', 'Please fill in your gender').isIn(['MALE', 'FEMALE']);
  req.assert('nid', 'NID is required').notEmpty();
  req.assert('username', 'username is required').notEmpty();
  req.assert('password', 'password name is required').notEmpty();
  req.assert('center', 'center name is required').notEmpty();

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);
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
    return res.status(500).send('Internal server error');
  }
};
exports.deleteUser = async (req, res) => {
  var o_id = new Object(req.params.id);
  await User.remove({ _id: o_id }, err => {
    console.log('Getting response');
    if (err) {
      console.log('catching errors');
      res.end(500);
    } else {
      res.end(200);
      console.log('Getting response');
    }
  });
};

exports.editUser = async (req, res) => {
  req.assert('username', 'username is required').notEmpty();
  req.assert('password', 'password name is required').notEmpty();

  if (req.validationErrors()) return res.status(400).send(req.validationErrors()[0]);

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await User.updateOne(
      { _id: req.params.id }, // <-- find stage
      {
        $set: {
          // <-- set stage
          username: user.username,
          password: user.password
        }
      }
    );
    res.end();
  } catch (error) {
    console.log('Catch' + error);
    res.status(500).send('Internal Server Error' + error);
  }
};

exports.authenticateUser = async (req, res) => {
  req.assert('username', 'username is required').notEmpty();
  req.assert('password', 'password name is required').notEmpty();

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await User.findOne({ username: user.username }, function(err, result) {
      if (result === null) {
        req.flash('error', "User doesn't exist!!Please contact system adminstrator");
        // res.render('admin/login', {
        //  title: 'Account Login',
        // id: '',
        // username: '',
        //pwd: ''
        //});
      } else if (result.username === user.username && result.password === user.password) {
        if (result.username === 'admin') {
          // res.redirect('/users');
          res.end();
        } else {
          //res.redirect('/users/doctorview');
          res.end();
        }

        //res.json({length: (user || [])});
      } else {
        //req.flash();
        //req.flash(
        //  'error',
        //  'Invalid username or password!!Please enter valid credentials'
        //);
        //res.render('admin/login', {
        //  title: 'Account Login',
        // id: '',
        // username: '',
        // pwd: ''
        // });
        res.status(400).send('Invalid username');
      }
    });
  } catch (error) {
    res.status(500).send('Internal Server erro' + error);
  }
};
