var express = require('express');
var router = express.Router();
const igdb = require('igdb-api-node').default;
const client = igdb('526cff9688c39641554c80315c09d76a');

/* 
	created global list variable because I was having a 
	difficult time sending queried data to the client side.
*/
var currList = [];
var currTitle;
var platform;

// Get homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

// Get edit
router.get('/edit', ensureAuthenticated, function(req, res) {
	res.render('edit');
});


// get Search Game
router.get('/SearchGame', ensureAuthenticated, function(req, res) {
	res.send('SearchGame');
});


// could move igdb api call this into /CurrList route to simplify code
router.get('/Search', ensureAuthenticated, function(req, res) {
	var title = req.query.title;
	currTitle = title;
	platform = req.query.platform;

	var games;

	if (title) {
		//var platform = req.query.platform;
		// check if valid input and platform (ie. empty strings)
		client
		.games({
			search: title,
			}, 
	//		filter {
	//			"release_dates.platform-eq" : platform
	//		},
			[
	    		'name',
	   			'cover',
	   			'platforms',
			]
		).then(function(response) {
			games = response.body;
			currList = games;
			res.render('SearchGame', {title: title});
		}).catch(function(error) {
	    throw error;
		});
	}
	else {
		currList = [];
		res.render('SearchGame', {error: 'Please enter a game to search'});
	}
});

router.get('/CurrList', ensureAuthenticated, function(req, res) {
	// check if the req.user already maked the game as have or want. if so, then dont render the button
	res.send({
				games: currList,
				title: currTitle,
				platform: platform,
				haveList: req.user.haveGame,
				wantList: req.user.wantGame 
			});
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		//req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
