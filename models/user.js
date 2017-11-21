var mongoose = require('mongoose');
mongoose.Promise = Promise;
var bcrypt = require('bcryptjs');

var math = require('mathjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	haveGame : {
		type: Array, "default" : []
	},
	wantGame: {
		type: Array, "default" : []
	},
	location: {
		address: {
			type: String, "default" : ""
		},
		city: {
			type: String, "default" : ""
		},
		state: {
			type: String,  "default" : ""
		}
	},
	geo: {
		type: [Number],
		index: '2dsphere'
	}

/*
		lng: {
			type: Number, "default" : null
		},
		lat: {
			type: Number, "default" : null
		}
*/
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {

	// encrypt the password
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(newUser.password, salt);

	newUser.password = hash;
	newUser.save(callback);
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	// Load hash from your password DB. 
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}

module.exports.setSession = function (user, req, callback) {
    req.session.user = user;
    callback(true);
}

module.exports.addWant = function(user, want, callback) {
	user.wantGame.push(want);
	user.save(callback);
}

module.exports.addHave = function(user, have, callback) {
	user.haveGame.push(have);
	user.save(callback);
}

module.exports.removeGameFromHave = function(user, game, callback) {

	User.update( { _id: user.id },
                 { "$pull": { "haveGame": { "id": game.id, "platform": game.platID } }},
                 { safe: true, multi: false },
                 function(err, obj) {
                 	if (err) throw err;
                 	console.log('game removed.');
                 	console.log('obj: ', obj);
                });
	user.save(callback);
}

module.exports.removeGameFromWant = function(user, game, callback) {

	User.update( { _id: user.id },
                 { "$pull": { "wantGame": { "id": game.id, "platform": game.platID } }},
                 { safe: true, multi: false },
                 function(err, obj) {
                 	if (err) throw err;
                 	console.log('game removed.');
                 	console.log('obj: ', obj);                
                });
	user.save(callback);
}

module.exports.updatePassword = function(user, password, callback) {
	// encrypt the password
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);

	User.update( { _id: user.id },
				 {"$set": { "password": hash } },
				 { safe: true, multi: false },
				 function(err, obj) {
                 	if (err) throw err;
                 	console.log('Account Password Updated.');
                 	console.log('obj: ', obj);
                });


	user.save(callback);
}

module.exports.updateLocation = function(user, location, callback) {
	User.update( { _id: user.id },
				 {"$set": { "location": location } },
				 { safe: true, multi: false },
				 function(err, obj) {
                 	if (err) throw err;
                 	console.log('Account Location Updated.');
                 	console.log('obj: ', obj);
                });
	user.save(callback);
}


module.exports.getUsersInRadius = function(data, callback) {

	var list;
    var radius = data.radius;
    var lat = data.lat;
    var lng = data.lng;


    var mileToKilometer = 1.60934; // conversion from miles to km
    var kilometerToMeter = 1000;
    var maxDist = mileToKilometer * radius; 

    // we need to convert the distance to radians
    maxDist *= kilometerToMeter; 

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = lng;
    coords[1] = lat;
/*
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

        res.send(locations);
    });
*/
	return list;
}
