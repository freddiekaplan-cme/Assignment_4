$(function() {
	
const API_MAGIC = "https://api.scryfall.com/cards/search";
let searchValue = "";
let input = document.getElementById("search-term");
let searchOptions = "";

document.getElementById("search-button").onclick = function() {
	return searchButton();
};

input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
	  event.preventDefault();
	  document.getElementById("search-button").click();
	}
  }); 

function searchButton() {
	searchValue = document.getElementById("search-term").value;
	$(".search-results").empty();
	searchOptions = "";
	magic();
}

function magic() {
	
	let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
	for (let checkbox of markedCheckbox) {
		searchOptions += checkbox.value;
	}

	//($("#unique-prints").is(":checked") ? searchOptions += "&unique=prints" : searchOptions = "");

	fetch(API_MAGIC  + "?q=" + searchValue + searchOptions/* + "+cheapest:usd"*/)
	.then((response) => response.json())
	.then((data) => {
	/*
	.catch(error =>
		{
			$("#results").text(error);
		}
		)
	*/
	
	

	function createResults() {
		$("#results").text('You searched for "' + searchValue + '" and got ' + data.total_cards + ' cards.');
		data.data.forEach(function (card) {
		let cardFace = "";
		let magicCard = "";
		let cardImage = "";
		(card.prices.usd === null ? card.prices.usd = "N/A" : card.prices.usd)
		if (card.layout === "transform" || card.layout === "modal_dfc" || card.layout === "art_series" || card.layout === "double_faced_token" || card.layout === "reversible_card") {		
			magicCard = $("<div id='" + card.id + "' class='card-item'>").appendTo($(".search-results"));
			cardImage = $("<div class='card-image'>").html("<img class='" + card.id + " card-face side-one' src='" + card.card_faces[0].image_uris.normal + "'><img class='" + card.id + " card-face side-two hidden' src='" + card.card_faces[1].image_uris.normal + "'><br>$" + card.prices.usd).appendTo($(magicCard));
			let turnCard = $("<button id='turn" + card.id + "' class='turn-card-over'>").text("↩️").appendTo(cardImage);		
			turnCard.on("click", function() {
				$("." + card.id).toggleClass("hidden");
			});		
		} else {
			cardFace = card.image_uris.normal;
			magicCard = $("<div id='" + card.id + "'>").appendTo($(".search-results"));
			cardImage = $("<div class='card-image'>").html("<img class='card-face' src='" + cardFace + "'><br>$" + card.prices.usd).appendTo($(magicCard));
		};

		$("img.card-face", cardImage).on("click", function() {
			let w = window.open("");
			w.document.writeln('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./styles/style.css"><script src="./scripts/jquery-3.6.2.min.js"></script><script defer src="./scripts/api-script.js"></script><title>' + card.name + '</title></head><body><header><h1>' + card.name + '</h1></header><main><div><img class="image" src="' + cardFace + '"><br>$' + card.prices.usd + '</div><div class="unique-prints"></div></main><footer>&copy; Freddie Kaplan 2023</footer></body></html>');
		});
		})
	}
	createResults();
	
	//slut fecth
	});
//slut magic function
}

//slut jQuery
})