$(document).ready(function(){
	console.log("on page load");
	getUserData();
});


// creates list of have games
function getUserData() {

	// get user data
	
	response = $.get('http://localhost:3000/users/getUserData', {}, function(userdata) {

		console.log(userdata);

		var haveList = userdata.haveGame;
		var wantList = userdata.wantGame;


	
		$('#wantList').empty();
		$('#haveList').empty();


		if (wantList != undefined) {
			for (var i = 0; i < wantList.length; i++) {
				gameItem = createListItem(wantList[i], true);
				$('#wantList').append(gameItem);
			}
		}

		if (haveList != undefined) {
			for (var i = 0; i < haveList.length; i++) {
				gameItem = createListItem(haveList[i], false);
				$('#haveList').append(gameItem);
			}
		}
	});

}


function createListItem(game, wantFlag) {
	
	var result, media, mediaLeft, image, 
		mediaBody, txt, heading, platform, 
		deleteButton, nameID, platformID,
		deleteForm, att;


	result = document.createElement("div");
	result.className = "game-result";



	media = document.createElement("div");
	media.className = "media overflow relative";

	att = document.createAttribute("data-original-title"); 
	att.value = game.name;
	media.setAttributeNode(att);



	mediaLeft = document.createElement("div");
	mediaLeft.className = "media-left";



	// add pic
	image = document.createElement("img");

	att = document.createAttribute("src"); 
	att.value = game.cover_img;
	image.setAttributeNode(att);


	// add heading and plaform
	mediaBody = document.createElement("div");
	mediaBody.className = "media-body";

	heading = document.createElement("h6");
	heading.className = "media-heading";


	title = document.createElement("span");
	txt = document.createTextNode(game.name);
	title.appendChild(txt);

	platform = document.createElement("small");
	platform.className = "game-shortdate text-muted";

	var platformTxt = " (" + convertPlatformToString(game.platform) + ")";
	txt = document.createTextNode(platformTxt);
	platform.appendChild(txt);



	// create delete form
	deleteForm = document.createElement("form");

	att = document.createAttribute("id"); 
	att.value = "deleteForm";
	deleteForm.setAttributeNode(att);

	att = document.createAttribute("method"); 
	att.value = "post";
	deleteForm.setAttributeNode(att);

	att = document.createAttribute("action"); 

	if (wantFlag) 
		att.value = "/users/DeleteGame/Want";
	else 
		att.value = "/users/DeleteGame/Have";

	deleteForm.setAttributeNode(att);



	//  nameID hidden
	nameID = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	nameID.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "gameID";
	nameID.setAttributeNode(att);


	att = document.createAttribute("name"); 
	att.value = "gameID";
	nameID.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.id;
	nameID.setAttributeNode(att);



	//  platformID hidden
	platformID = document.createElement("input");

	att = document.createAttribute("type"); 
	att.value = "hidden";
	platformID.setAttributeNode(att);

	att = document.createAttribute("id"); 
	att.value = "platformID";
	platformID.setAttributeNode(att);


	att = document.createAttribute("name"); 
	att.value = "platformID";
	platformID.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = game.platform;
	platformID.setAttributeNode(att);



	// delete button
	deleteButton = document.createElement("input");
	deleteButton.className = "btn btn-info";

	att = document.createAttribute("type"); 
	att.value = "submit";
	deleteButton.setAttributeNode(att);

	att = document.createAttribute("value"); 
	att.value = "Remove";
	deleteButton.setAttributeNode(att);



	// append elements in order

	/* in this order:
		add game result div
			media div
				media left div
					add cover pic
				end div
				media body div
					media heading
					platform
				end	div
				delete button
			end div
		end div			
	*/

	mediaLeft.appendChild(image);
	media.appendChild(mediaLeft);

	heading.appendChild(title);
	heading.appendChild(platform);
	mediaBody.appendChild(heading);

	deleteForm.appendChild(nameID);
	deleteForm.appendChild(platformID);
	deleteForm.appendChild(deleteButton);

	mediaBody.appendChild(deleteForm);

	media.appendChild(mediaBody);

	result.appendChild(media);


	return result;
}

// a better solution is to create a mapping from value to string
// so that when number of platforms grow, i dont need to update this function
// or other functions that do it manually
function convertPlatformToString(platID) {
/*
    	<option value="6">PC</option>
    	<option value="48">Play Station 4</option>
    	<option value="9">Play Station 3</option>
    	<option value="8">Play Station 2</option>
    	<option value="41">Wii U</option>
    	<option value="5">Wii</option>
  		<option value="49">Xbox One</option>
  		<option value="12">Xbox 360</option>
  		<option value="11">Xbox</option>
*/

	if (platID == "6") {
		return "PC";
	}
	else if (platID == "48") {
		return "Play Station 4";
	}
	else if (platID == "9") {
		return "Play Station 3";
	}
	else if (platID == "8") {
		return "Play Station 2";
	}
	else if (platID == "41") {
		return "Wii U";
	}
	else if (platID == "5") {
		return "Wii";
	}
	else if (platID == "49") {
		return "Xbox One";
	}
	else if (platID == "12") {
		return "Xbox 360";
	}
	else if (platID == "11") {
		return "Xbox";
	}
	else 
		return "No Platform";
}