var express = require('express');
var router = express.Router();

var User = require('../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Register
router.get('/register', function (req, res) {
    res.render('register');
});


// login
router.get('/login', function (req, res) {
    res.render('login');
});

// Register User
router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.paaaword2;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var lat = req.body.lat;
    var lng = req.body.lng;

    // validation
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Emial is not valid').isEmail();

    // need to check if it is an actual city and state, using google api
    // can fix state by adding a scrolling/select
    // can fix city the same way
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();

    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Please re-enter password').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


    var errors = req.validationErrors();

    if (errors) {
    	res.render('register', {
    		errors: errors
    	});
    }
    else {
    	var newUser = new User({
    		username: username,
            email: email,
    		password: password,
            location: {
                address: address,
                city: city,
                state: state,
                lng: lng,
                lat: lat
            }
    	});

    	User.createUser(newUser, function(err, user){
    		if (err) throw err;
    		console.log(user);
    	});

    	req.flash('success_msg', 'You are registered and can now login');

    	res.redirect('/users/login');
    }
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, {message: 'Uknown User'});
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if(isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: 'Invalide password'});
            }
        })
    })
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


// login
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });


// logout
router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are loggout out');

    res.redirect('/users/login');
});

module.exports = router;
