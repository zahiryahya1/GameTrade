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
    req.sanitize('city').trim();
    req.sanitize('state').trim();
    req.sanitize('address').trim();
    req.sanitize('username').trim();
    req.sanitize('email').trim();
    req.sanitize('name').trim();

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

    req.checkBody('location', 'You entered a bad address').equals("good");


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
                //lng: lng,
                //lat: lat
            },
            geo:
                [lng, lat]
    	});

    	User.createUser(newUser, function(err, user){
    		if (err) throw err;
    		console.log(user);
    	});

    	req.flash('success_msg', 'You are registered and can now login');

    	res.redirect('/users/login');
    }
});


// update account
router.post('/UpdateAccount', function(req, res) {
    req.sanitize('city').trim();
    req.sanitize('state').trim();
    req.sanitize('address').trim();


    var password = req.body.password;
    var password2 = req.body.password2;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var addy = true;
    var citystate = false;

    // validation

    // if address is given, we need city and state
    if (address.length != 0) {
        if (city.length == 0 && state.length == 0) {
            req.checkBody('city', 'City and State are both required').notEmpty();
            addy = false;
        }

        else if (city.length == 0 || state.length == 0) {
            if (city.length == 0)
                req.checkBody('city', 'City and State are both required').notEmpty();
            else 
                req.checkBody('state', 'City and State are both required').notEmpty();

            addy = false;
        }
    }

    if (city.length != 0 || state.length != 0)
        citystate = true;

    // if city or state is give, the other must be given as well
    // if both are empty that fine
    if (citystate && addy && (city.length == 0 || state.length == 0) ) {
        if (city.length == 0)
            req.checkBody('city', 'City and State are both required').notEmpty();
        else 
            req.checkBody('state', 'City and State are both required').notEmpty();

        addy = false;
    }


    // if password is given, then the new password is required
    // if non are given, skip
    if (password.length != 0 || password2 != 0) {
        if (password2.length == 0) {
           req.checkBody('password2', 'Please confirm password').notEmpty(); 
        }
        else
            req.checkBody('password2', 'Passwords do not match').equals(password);
    }


    // if address is good, check if location is real
    if (addy && (!(address.length == 0 && state.length == 0 && city.length == 0)) &&
        (
            (address.length != 0 && state.length != 0 && city.length != 0) || 
            (address.length == 0 && state.length != 0 ** city.length != 0)
        ) 
       )
        req.checkBody('location', 'You entered a bad address').equals("good");


    var errors = req.validationErrors();

    // if nothing is set, return
    if ((address.length == 0 && state.length == 0 && city.length == 0) &&
        password.length == 0 && password2.length == 0) {
        res.redirect('/edit');
    }

    if (errors) {
        res.render('edit', {
            errors: errors
        });
    }
    else {
        
        var updateAddy = false;


        // update password
        if (password.length != 0) {
            User.updatePassword(req.user, password, function(err, user) {
                if (err) throw err;
                console.log(user);
            });
        }

        // update location using address
        if (address.length != 0) {
            var location = {
                address: address,
                city: city,
                state: state,
                lat: lat,
                lng: lng
            }
        }
        else if (state.length != 0 && city.length != 0) {
            var location = {
                address: address,
                city: city,
                state: state,
                lat: lat,
                lng: lng
            }

            User.updateLocation(req.user, location, function(err, user) {
                if (err) throw err;
                console.log(user);
            });
        }

        req.flash('success_msg', 'You account has been updated');

        res.redirect('/edit');
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
  passport.authenticate('local', {failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });


// logout
router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are loggout out');

    res.redirect('/users/login');
});

// add game to have list
router.post('/AddHave', function(req, res) {

    var user = req.user;
    var have = {id: req.body.gameID, name: req.body.name, platform: req.body.platform, cover_img: req.body.cover_img};

    User.addHave(user, have, function(err, user) {
        if (err) throw err;
        console.log(user);
    });

    req.flash('success_msg', 'Game has been added to your have list');

    res.redirect('/edit');
});


// add game to want list
router.post('/AddWant', function(req, res) {
    var user = req.user;

    var want = {id: req.body.gameID, name: req.body.name, platform: req.body.platform, cover_img: req.body.cover_img};

    User.addWant(user, want, function(err, user) {
        if (err) throw err;
        console.log(user);
    });

    req.flash('success_msg', 'Game has been added to your want list');

    res.redirect('/edit');
});

router.get('/getUserData', function(req, res) {
    // sanity check, should never be undefined
    if (req.user == undefined)
        data = undefined;
    else 
        var data = {haveGame: req.user.haveGame, wantGame: req.user.wantGame};
    res.send(data);
});


// delete game from users want list
router.post('/DeleteGame/Want', function(req, res) {
    var user = req.user;

    var game = {id: req.body.gameID, platID: req.body.platformID};

    User.removeGameFromWant(user, game, function(err, user) {
        if (err) throw err;
        console.log(user);
    });

    res.redirect('/edit');
});


// delete game from users have list
router.post('/DeleteGame/Have', function(req, res) {
    var user = req.user;

    var game = {id: req.body.gameID, platID: req.body.platformID};

    User.removeGameFromHave(user, game, function(err, user) {
        if (err) throw err;
        console.log(user);
    });

    res.redirect('/edit');
});


// get list of users within given radius
router.get('/UsersInRadius', function(req, res) {
    var list;
    var radius = req.query.radius;
    var lat = req.user.geo[1];
    var lng = req.user.geo[0];


    var mileToKilometer = 1.60934; // conversion from miles to km
    var kilometerToMeter = 1000;
    var maxDist = mileToKilometer * radius; 

    // we need to convert the distance to radians
    maxDist *= kilometerToMeter; 

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = lng;
    coords[1] = lat;

    // might want to move this to the user model to make code cleaner
    var query = User.find( {
        geo: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: maxDist // in meters
            }
        }
    } );

    query.exec(function(err, locations) {
        if (err) throw err;

        console.log('locations: ', locations);
        list = locations;
        res.send(locations);
    });

});


module.exports = router;

