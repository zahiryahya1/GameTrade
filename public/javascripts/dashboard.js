$(document).ready(function(){
	console.log("on page load");
	findMatch();
});


function findMatch() {

	// first make a call to find users in the max radius (50 miles) of user curr lat and lng,
	// and return an array of users
	// next compare users wants with the others have. create an array of games for each user obj = [ {user: , games: []]
	// then compare other users wants with users have. (if user has at least 1 game the other wants, add to array)
	var maxRadius = 50;
	console.log(maxRadius);
	response = $.get('http://localhost:3000/users/UsersInRadius', {radius: maxRadius}, function(data) {
		console.log(data);

	});
}