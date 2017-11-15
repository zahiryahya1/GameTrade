// 
$(document).ready(function(){
	updateResults();
});



// updates the list of games that are shown
function updateResults() {
	// fetch data on each game from igdb
	response = $.get('http://localhost:3000/CurrList', {}, function(data) {
		var games = data.games;
		var title = data.title;
		var gameList = document.getElementById('gameList');

		if (games.length == 0) {
			return;
		}

		console.log(games);

		$('#gameList').empty();
		var para = document.createElement("P");
		para.className = "mar-md-bottom text-muted";
		var t = document.createTextNode(games.length + " results for \"" + title + "\"");
		para.appendChild(t);
		$('#gameList').append(para);



		// make div for each game in db
		for(i = 0; i < games.length; i++) {
			gameItem = createDiv(games[i]);
			$('#gameList').append(gameItem);
		}
	});
} 


// create div for game data
function createDiv(game) {
	var result, media, mediaLeft, image, 
	    mediaBody, heading, title, att, txt;

	result = document.createElement("div");
	result.className = "game-result";

	media = document.createElement("div");
	media.className = "media overflow relative";
	att = document.createAttribute("data-original-title"); 
	att.value = game.name;
	media.setAttributeNode(att);

	mediaLeft = document.createElement("div");
	mediaLeft.className = "media-left";

	// add thumb tag if exists
	image = document.createElement("img");
	att = document.createAttribute("src"); 
	if (game.cover) {
		att.value = game.cover.url;
	}
	else {
		att.value = "//images.igdb.com/igdb/image/upload/t_thumb/nocover_qhhlj6.jpg";
	}
	image.setAttributeNode(att);

	mediaBody = document.createElement("div");
	mediaBody.className = "media-body";

	heading = document.createElement("h4");
	heading.className = "media-heading";

	title = document.createElement("span");
	txt = document.createTextNode(game.name);
	title.appendChild(txt);

	// appends elements in the correct order
	mediaLeft.appendChild(image);
	media.appendChild(mediaLeft);
	
	
	heading.appendChild(title);
	mediaBody.appendChild(heading);

	media.appendChild(mediaBody);
	result.appendChild(media);


	return result;
}