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

// Get homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

// Get edit
router.get('/edit', function(req, res) {
	res.render('edit');
});

// get Search Game
router.get('/SearchGame', function(req, res) {
	res.send('SearchGame');
});

// get game
// should use res.send(data) then in js file, 
// call $.get(.../SearchGame, function(data) { create div for each game })
router.get('/Search', function(req, res) {
	var title = req.query.title;
	currTitle = title;
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
	   			'screenshots',
	   			'platforms'
			]
		).then(function(response) {
			games = response.body;
			console.log(games[0]);
			currList = games;
			res.render('SearchGame', {title: title, games: games});
		}).catch(function(error) {
	    throw error;
		});
	}
	else {
		currList = [];
		res.render('SearchGame', {error: 'Please enter a game to search'});
	}
});

router.get('/CurrList', function(req, res) {
	res.send({games: currList, title: currTitle});
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
