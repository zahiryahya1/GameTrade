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
		for(var i = 0; i < games.length; i++) {
			gameItem = createDiv(games[i], wantList, haveList);
			$('#gameList').append(gameItem);
		}
	});
} 


// create div for game data
function createDiv(game, wantList, haveList) {

	var result, media, mediaLeft, image, 
	    mediaBody, heading, title, att, 
	    txt, haveButton, wantButton,
	    wantForm, haveForm, gameID1, platform1,
	    gameID2, platform2;

	var gameObj = JSON.stringify({id: game.id.toString(), platform: "100"});

	var wantFlag = false;
	var haveFlag = false;

	
	/* stringify the json onject to compare if game is already in user list.
	   note: does not take into account the order of the properties */
	for (var i = 0; i < wantList.length; i++) {
		if ( gameObj == JSON.stringify(wantList[i]) ) {
			console.log(wantList[i]);
			wantFlag = true;
			//break;
		}
	}

	// search if game is in have list, then mark flag
	for (var j = 0; j < haveList.length; j++) {
		if ( gameObj == JSON.stringify(haveList[j]) ) {
			console.log(haveList[j]);
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
	att.value = 100;
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
	att.value = 100;
	platform2.setAttributeNode(att);



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
	haveForm.appendChild(haveButton);

	wantForm.appendChild(gameID2);
	wantForm.appendChild(platform2);
	wantForm.appendChild(wantButton);

	mediaBody.appendChild(wantForm);
	mediaBody.appendChild(haveForm);

	media.appendChild(mediaBody);
	result.appendChild(media);

	return result;
}


/**
 * not so simple check for object equality
 */
var equal = function(a, b) {
    function check(a, b) {
        for (var attr in a) {
            if (a.hasOwnProperty(attr) && b.hasOwnProperty(attr)) {
                if (a[attr] != b[attr]) {
                    switch (a[attr].constructor) {
                        case Object:
                            return equal(a[attr], b[attr]);
                        case Function:
                            if (a[attr].toString() != b[attr].toString()) {
                                return false;
                            }
                            break;
                        default:
                            return false;
                    }
                }
            } else {
                return false;
            }
        }
        return true;
    };
    return check(a, b) && check(b, a);
};