/*jshint esversion: 6 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var ObjectId = require('mongodb').ObjectId;

	const mongoClient = require('mongodb').MongoClient;
	const mongoDbUrl = 'mongodb://localhost:27017/e_appointment';
	var dbcol;
	var dbcol1;
	var dbcol2;
	
	//const mongoDbUrl = 'mongodb+srv://emmy:emmy@cluster0-2tj0h.mongodb.net/test?retryWrites=true';
   // Connect to MongoDB
	mongoClient.connect(mongoDbUrl).then(db => {
		console.log('mongodb connected');
		dbcol = db.collection('Appointments'); 
		dbcol1 = db.collection('Users');
		dbcol2 = db.collection('Center')
		 // Reuse dbcol for DB CRUD operations
		

		}).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

	});


	var smtpTransport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "abiringiraemmanuel@gmail.com",
			pass: "emmyzion"
		},
		debug: true
	  });


// SHOW LIST OF USERS
app.get('/', function(req, res, next) {	
	// fetch and sort users collection by id in descending order

	dbcol.find().sort({"_id": -1}).toArray (function(err, result) {
		//if (err) return console.log(err)
		console.log(result.toString());
		if (err) {
			req.flash('error', err);
			res.render('appointment/list', {
				title: 'Appointment List', 
				data: ''
			});
		} else {
		
			// render to views/user/list.ejs template file
			res.render('appointment/list', {
				title: 'Appointment List', 
				data: result
			});
		}
	});
});


app.get('/doctorview', function(req, res, next) {	
	// fetch and sort users collection by id in descending order
	dbcol.find().sort({"_id": -1}).toArray (function(err, result) {
		//if (err) return console.log(err)
		if (err) {
			req.flash('error', err);
			res.render('appointment/doctorviewList', {
				title: 'Appointment List', 
				data: ''
			});
		} else {
		
			// render to views/user/list.ejs template file
			res.render('appointment/doctorviewList', {
				title: 'Appointment List', 
				data: result
			});
		}
	});
});

// SHOW center FORM
app.get('/center', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('admin/center', {
		title: 'Add Center',
		name: '',
		district: ''
	    		
	});
});


app.post('/center', function(req, res, next){	
	req.assert('name', ' Name is required').notEmpty();          //Validate name
	req.assert('district', 'District is required').notEmpty();
	
	var errors = req.validationErrors();
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		var user = {
			name: req.sanitize('name').escape().trim(),
			district: req.sanitize('district').escape().trim(),
	
		};
				 
		dbcol2.insert(user, function(err, result) {
			if (err) {
				req.flash('error', err);
				
				// render to views/user/add.ejs
				res.render('admin/center', {
					title: 'Add Center',
		            name: '',
		           district: ''
									
				});
			} else {				
				req.flash('success', 'Center Added! ');
				// redirect to user list page				
				res.redirect('/users');
			}
		});		
	}
	else {   //Display errors to user
		var error_msg = '';
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>';
		});
		req.flash('error', error_msg);	
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('admin/center', { 
			title: 'Add Center',
		            name: '',
		           district: ''
        });
    }
});




// SHOW LOGIN FORM

app.get('/signup', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('admin/signup', {
		title: 'Account Creation',
		fname: '',
		lname: '',
	    mobile: '',
		email: '',
		gender: '',
		identity: '',
		username: '',
		pwd: '',
		center:''   		
	});
});

app.post('/signup', function(req, res, next){	
	req.assert('fname', 'First Name is required').notEmpty();          //Validate name
	req.assert('lname', 'Last Name is required').notEmpty();
	req.assert('mobile', 'Mobile Number is required').notEmpty();		//Validate age
	req.assert('email', 'A valid email is required').isEmail();  //Validate email
	req.assert('gender', 'Please fill in student gender').notEmpty();
	req.assert('identity', 'Student ID is required').notEmpty(); 
	req.assert('username', 'username is required').notEmpty(); 
	req.assert('pwd', 'pwd name is required').notEmpty(); 
	req.assert('center', 'center name is required').notEmpty(); 
	 
    var errors = req.validationErrors();
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		var user = {
			fname: req.sanitize('fname').escape().trim(),
			lname: req.sanitize('lname').escape().trim(),
			mobile: req.sanitize('mobile').escape().trim(),
			email: req.sanitize('email').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
			identity: req.sanitize('identity').escape().trim(),
			username: req.sanitize('username').escape().trim(),
			pwd: req.sanitize('pwd').escape().trim(),
			center: req.sanitize('center').escape().trim(),

		};
				 
		dbcol1.insert(user, function(err, result) {
			if (err) {
				req.flash('error', err);
				
				// render to views/user/add.ejs
				res.render('admin/signup', {
					title: 'Add New User',
					fname: user.fname,
					lname: user.lname,
					age: user.age,
					mobile: user.mobile,
					email: user.email,
					gender: user.gender,
					username: user.username,
					pwd: user.pwd,
					center: user.center
									
				});
			} else {				
				req.flash('success', 'Welcome to Login page! ');
				// redirect to user list page				
				res.redirect('/users/login');
			}
		});		
	}
	else {   //Display errors to user
		var error_msg = '';
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>';
		});
		req.flash('error', error_msg);	
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('admin/signup', { 
            title: 'Add New User',
            fname: req.body.fname,
            lname: req.body.lname,
            age: req.body.age,
            mobile: req.body.mobile,
			email: req.body.email,
			gender: req.body.gender,
			identity: req.body.identity,
			province: req.body.province,
			district: req.body.district,
			counselor: req.body.counselor
        });
    }
});
app.get('/login', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('admin/login', {
		title: 'Account Login',
		id :'',
		username: '',
		pwd: ''   		
	});
});

app.post('/login',urlencodedParser,function(req,res){
	dbcol1.findOne({username:req.body.username},function(err, user) {
			  if(user ===null){
				req.flash('error', "User doesn't exist!!Please contact system adminstrator");
			   res.render('admin/login',{
				title: 'Account Login',
				id :'',
				username: '',
				pwd: ''   

			   });
			 }else if (user.username === req.body.username && user.pwd === req.body.pwd){
				   if(user.username === 'admin') {
					res.redirect('/users')
				   } else {
					res.redirect('/users/doctorview')  
				   }
				
				//res.json({length: (user || [])});
		   } else {
			   //req.flash();
			   req.flash('error', "Invalid username or password!!Please enter valid credentials");
			   res.render('admin/login',{
				title: 'Account Login',
				id :'',
				username: '',
				pwd: ''   

			   });
			 console.log("Credentials wrong");
			 console.log(user.username);
			 console.log(req.body.username);
			 console.log(req.body.pwd);
			 //res.end("Login invalidAfter");
		   }
	});
 
 });

// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	dbcol2.find().sort({"_id": -1}).toArray (function(err, centerresult) {
		//console.log(centerresult.toString());
	res.render('appointment/add', {
		title: 'Add New Appointment',
		fname: '',
		lname: '',
		  age: '',
	   mobile: '',
		email: '',
		gender: '',
		identity: '',
		province: '',
		district: '',
		counselor: '',
		datacenter: centerresult	
		
	});
	//res.json({Result : centerresult});
	
   });
   
});



// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('fname', 'First Name is required').notEmpty();          //Validate name
	req.assert('lname', 'Last Name is required').notEmpty();
	req.assert('age', 'Age is required').notEmpty();
	req.assert('mobile', 'Mobile Number is required').notEmpty();		//Validate age
	req.assert('email', 'A valid email is required').isEmail();  //Validate email
	req.assert('gender', 'Please fill in student gender').notEmpty();
	req.assert('identity', 'Student ID is required').notEmpty(); 
	req.assert('province', 'province is required').notEmpty(); 
	req.assert('district', 'Faculty name is required').notEmpty(); 
	req.assert('sector', 'Enter sector').notEmpty(); 
	req.assert('counselor', 'Enter desired couselor').notEmpty();  
    var errors = req.validationErrors();
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		var user = {
			fname: req.sanitize('fname').escape().trim(),
			lname: req.sanitize('lname').escape().trim(),
			age: req.sanitize('age').escape().trim(),
			mobile: req.sanitize('mobile').escape().trim(),
			email: req.sanitize('email').escape().trim(),
			gender: req.sanitize('gender').escape().trim(),
			identity: req.sanitize('identity').escape().trim(),
			province: req.sanitize('province').escape().trim(),
			district: req.sanitize('district').escape().trim(),
			sector: req.sanitize('sector').escape().trim(),
			status:'Pending',
			Date :'Not Comfirmed',
			Time :'Not Confirmed',
			counselor: req.sanitize('counselor').escape().trim(),

		};
				 
		dbcol.insert(user, function(err, result) {
			if (err) {
				req.flash('error', err);
				
				// render to views/user/add.ejs
				res.render('appointment/add', {
					title: 'Add New User',
					fname: user.fname,
					lname: user.lname,
					age: user.age,
					mobile: user.mobile,
					email: user.email,
					gender: user.gender,
					identity: user.id,
					province: user.province,
					district: user.district,
					sector: user.sector,
					counselor: user.counselor					
				});
			} else {				
				req.flash('success', 'Appointment request successfully!We will send you a confirmation on your email ');
				// redirect to user list page				
				res.redirect('/users');
			}
		});		
	}
	else {   //Display errors to user
		var error_msg = '';
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>';
		});
		req.flash('error', error_msg);	
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('appointment/add', { 
            title: 'Add New User',
            fname: req.body.fname,
            lname: req.body.lname,
            age: req.body.age,
            mobile: req.body.mobile,
			email: req.body.email,
			gender: req.body.gender,
			identity: req.body.identity,
			province: req.body.province,
			district: req.body.district,
			counselor: req.body.counselor
        });
    }
});

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
	var o_id = new ObjectId(req.params.id);
	dbcol.find({"_id": o_id}).toArray(function(err, result) {
		if(err) {
			return console.log(err);
		}
		
		// if user not found
		if (!result) {
			req.flash('error', 'User not found with id = ' + req.params.id);
			res.redirect('/users');
		}
		else { // if user found
			// render to views/user/edit.ejs template file
			res.render('appointment/edit', {
				title: 'Edit User', 
				//data: rows[0],
				id: result[0]._id,
				fname: result[0].fname,
				lname: result[0].lname,
				age: result[0].age,
				mobile: result[0].mobile,
				email: result[0].email,
				gender: result[0].gender,
				identity: result[0].identity,
				province: result[0].province,
				district: result[0].district,
				counselor: result[0].counselor


			});
		}
	});
});

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('fname', 'First Name is required').notEmpty();           //Validate name
	req.assert('lname', 'Last Name is required').notEmpty();
	req.assert('age', 'Age is required').notEmpty();
	req.assert('mobile', 'Mobile Number is required').notEmpty();			//Validate age
	req.assert('email', 'A valid email is required').isEmail();  //Validate email,
	req.assert('gender', 'Please fill in student gender').notEmpty();
	req.assert('identity', 'Student ID is required').notEmpty(); 
	req.assert('province', 'province is required').notEmpty(); 
	req.assert('district', 'district name is required').notEmpty(); 
	req.assert('counselor', 'Enter desired counselor').notEmpty();  
	

    var errors = req.validationErrors();
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var user = {
				fname: req.sanitize('fname').escape().trim(),
				lname: req.sanitize('lname').escape().trim(),
				age: req.sanitize('age').escape().trim(),
				mobile: req.sanitize('mobile').escape().trim(),
				email: req.sanitize('email').escape().trim(),
				gender: req.sanitize('gender').escape().trim(),
				identity: req.sanitize('identity').escape().trim(),
				province: req.sanitize('province').escape().trim(),
				district: req.sanitize('dictrict').escape().trim(),
				counselor: req.sanitize('counselor').escape().trim(),
		};
		
		var o_id = new ObjectId(req.params.id);
		dbcol.update({"_id": o_id}, user, function(err, result) {
			if (err) {
				req.flash('error', err);
				
				// render to views/user/edit.ejs
				res.render('user/edit', {
					title: 'Edit User',
					id: req.params.id,
					fname: req.body.fname,
					lname: req.body.lname,
					age: req.body.age,
					mobile: req.body.mobile,
					email: req.body.email,
					gender: req.body.gender,
					identity: req.body.identity,
					province: req.body.province,
					district: req.body.dictrict,
					counselor: req.body.counselor		
				});
			} else {
				req.flash('success', 'Data updated successfully!');
				
				res.redirect('/users');
			}
		});	
	}
	else {   //Display errors to user
		var error_msg = '';
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>';
		});
		req.flash('error', error_msg);
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('appointment/edit', { 
            title: 'Edit User',            
			id: req.params.id, 
			fname: req.body.fname,
			lname: req.body.lname,
			 age: req.body.age,
			mobile:req.body.mobile,
			email: req.body.email,
			gender: req.body.gender,
			identity: req.body.identity,
			province: req.body.province,
			district: req.body.district,
			counselor: req.body.counselor		
        });
    }
});

// SENDING EMAIL
app.delete('/send/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id);
	dbcol.find({"_id": o_id}).toArray(function(err, result) {
		if(err) {
			return console.log(err);
		}
		
		// if user not found
		if (!result) {
			req.flash('error', 'User not found with id = ' + req.params.id);
			res.redirect('/users');
		}
		else { // if user found
			// render to views/user/edit.ejs template file
			res.render('contact', {
				title: 'Send Email', 
				//data: rows[0],
				id: result[0]._id,
				fname: result[0].fname,
				email: result[0].email,
				subject : '',
				message :''
				
			});
		}
	});
	
});

app.post('/send/(:id)',function(req,res){
	var user = {
		email: req.sanitize('email').escape().trim(),
		subject: req.sanitize('subject').escape().trim(),
		message: req.sanitize('message').escape().trim(),
	};
    var mailOptions={
        to: user.email,
        subject : user.subject,
        text : user.message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.end("error");
     } else{
			console.log("Message sent: " + response.message);
			req.flash('success', 'Email Sent Successfully!');
			res.redirect('/users');	
        }
    });
});

module.exports = app;
