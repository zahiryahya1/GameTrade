// 
$(document).ready(function(){
	console.log("on page load");
	updateResults();
});



// updates the list of games that are shown
function updateResults() {
	// fetch data on each game from igdb
	response = $.get('http://localhost:3000/CurrList', {}, function(data) {
		var games = data.games;
		var title = data.title;
		var wantList = data.wantList;
		var haveList = data.haveList;
		var platform = data.platform;
		var count = 0;
		var att;

		var gameList = document.getElementById('gameList');

		if (games.length == 0) {
			return;
		}

		console.log(games);

		$('#gameList').empty();
		var para = document.createElement("P");
		para.className = "mar-md-bottom text-muted";
		att = document.createAttribute("id"); 
		att.value = "count";
		para.setAttributeNode(att);
		var t = document.createTextNode("temp");
		para.appendChild(t);
		$('#gameList').append(para);



		// make div for each game in db
		for(var i = 0; i < games.length; i++) {
			// check if the games platforms match with the user platform
			if (games[i].platforms == undefined) continue;

			for(var j = 0; j < games[i].platforms.length; j++) {
				if (games[i].platforms[j].toString() == platform) {
					gameItem = createDiv(games[i], platform, wantList, haveList);
					$('#gameList').append(gameItem);
					count++;
				}
			}
		}

		document.getElementById('count').innerHTML = count + " results for \"" + title + "\"";
	});
} 


// create div for game data
function createDiv(game, platform, wantList, haveList) {

	var result, media, mediaLeft, image, 
	    mediaBody, heading, title, att, 
	    txt, haveButton, wantButton, att2,
	    wantForm, haveForm, 
	    gameID1, platform1,
	    gameID2, platform2,
	    img1, img2,
	    name1, name2;

	var gameObj = JSON.stringify({id: game.id.toString(), name: game.name, platform: platform, cover_img: game.cover.url});

	var wantFlag = false;
	var haveFlag = false;

	
	/* stringify the json onject to compare if game is already in user list.
	   note: does not take into account the order of the properties */
	for (var i = 0; i < wantList.length; i++) {
		if ( gameObj == JSON.stringify(wantList[i]) ) {
			wantFlag = true;
			//break;
		}
	}

	// search if game is in have list, then mark flag
	for (var j = 0; j < haveList.length; j++) {
		if ( gameObj == JSON.stringify(haveList[j]) ) {
			haveFlag = true;
			//break;
		}	
	}
	


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
		image.setAttributeNode(att);
		image.setAttributeNode(att);
	}
	else {
		att.value = "//images.igdb.com/igdb/image/upload/t_thumb/nocover_qhhlj6.jpg";
		image.setAttributeNode(att);
	}

	mediaBody = document.createElement("div");
	mediaBody.className = "media-body";

	heading = document.createElement("h4");
	heading.className = "media-heading";


	title = document.createElement("span");
	txt = document.createTextNode(game.name);
	title.appendChild(txt);



	// create want form
	wantForm = document.createElement("form");

	att = document.createAttribute("id"); 
	att.value = "wantForm";
	wantForm.setAttributeNode(att);

	att = document.createAttribute("method"); 
	att.value = "post";
	wantForm.setAttributeNode(att);

	att = document.createAttribute("action"); 
	att.value = "/users/AddWant";
	wantForm.setAttributeNode(att);



	// create hiden game id input
	gameID1 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	gameID1.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "gameID";
	gameID1.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "gameID";
	gameID1.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.id;
	gameID1.setAttributeNode(att);

	gameID2 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	gameID2.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "gameID";
	gameID2.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "gameID";
	gameID2.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.id;
	gameID2.setAttributeNode(att);



	// create hiden platform input
	platform1 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	platform1.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "platform";
	platform1.setAttributeNode(att);


	att = document.createAttribute("name"); 
	att.value = "platform";
	platform1.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = platform;
	platform1.setAttributeNode(att);

	platform2 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	platform2.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "platform";
	platform2.setAttributeNode(att);


	att = document.createAttribute("name"); 
	att.value = "platform";
	platform2.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = platform;
	platform2.setAttributeNode(att);



	// create hiden game name input
	name1 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	name1.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "name";
	name1.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "name";
	name1.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.name;
	name1.setAttributeNode(att);

	name2 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	name2.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "game";
	name2.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "name";
	name2.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.name;
	name2.setAttributeNode(att);



	// create hiden game img input
	img1 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	img1.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "img";
	img1.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "cover_img";
	img1.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.cover.url;
	img1.setAttributeNode(att);

	img2 = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	img2.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "img";
	img2.setAttributeNode(att);

	att = document.createAttribute("name"); 
	att.value = "cover_img";
	img2.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.cover.url;
	img2.setAttributeNode(att);



	// create have form
	haveForm = document.createElement("form");

	att = document.createAttribute("id"); 
	att.value = "haveForm";
	haveForm.setAttributeNode(att);

	att = document.createAttribute("method"); 
	att.value = "post";
	haveForm.setAttributeNode(att);

	att = document.createAttribute("action"); 
	att.value = "/users/AddHave";
	haveForm.setAttributeNode(att);



	// create want button
	wantButton = document.createElement("input");
	wantButton.className = "btn btn-info";

	att = document.createAttribute("type"); 
	att.value = "submit";
	wantButton.setAttributeNode(att);

	if (wantFlag) {
		att = document.createAttribute("disabled"); 
		wantButton.setAttributeNode(att);
	}

	att = document.createAttribute("value"); 
	att.value = "Want";
	wantButton.setAttributeNode(att);



	// create have button
	haveButton = document.createElement("input");
	haveButton.className = "btn btn-info";

	att = document.createAttribute("type"); 
	att.value = "submit";
	haveButton.setAttributeNode(att);

	if (haveFlag) {
		att = document.createAttribute("disabled"); 
		haveButton.setAttributeNode(att);
	}

	att = document.createAttribute("value"); 
	att.value = "Have";
	haveButton.setAttributeNode(att);



	// appends elements in the correct order
	mediaLeft.appendChild(image);
	media.appendChild(mediaLeft);	
	
	heading.appendChild(title);
	mediaBody.appendChild(heading);

	haveForm.appendChild(gameID1);
	haveForm.appendChild(platform1);
	haveForm.appendChild(name1);
	haveForm.appendChild(img1);
	haveForm.appendChild(haveButton);

	wantForm.appendChild(gameID2);
	wantForm.appendChild(platform2);
	wantForm.appendChild(name2);
	wantForm.appendChild(img2);
	wantForm.appendChild(wantButton);

	mediaBody.appendChild(wantForm);
	mediaBody.appendChild(haveForm);

	media.appendChild(mediaBody);
	result.appendChild(media);

	return result;
}

