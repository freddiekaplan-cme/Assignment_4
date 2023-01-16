$(function() {
	
const API_MAGIC = "https://api.scryfall.com/cards/search";
let searchValue = "";
let input = document.getElementById("search-term");
let searchOptions = "";
let sortBy = "";
let commanderId = "";
let oracleSearch = "";

document.getElementById("search-button").onclick = function() {
	$("#search-button").addClass("clicked-button");
	return setTimeout(function() { 
		searchButton()
	}, 250);
};

input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
	  event.preventDefault();
	  document.getElementById("search-button").click();
	}
  }); 

function searchButton() {
	$("#search-button").removeClass("clicked-button");
	searchValue = document.getElementById("search-term").value;

	if ($("input[type='radio'][id='search-oracle']:checked")) {		
		searchValue = searchValue.replace(" ", " o:");
	}

	$(".search-results").empty();
	searchOptions = "";
	sortBy = "";
	commanderId = "";
	oracleSearch = "";
	magic();
}

$("label").click(function(event) {
	if ($(this).hasClass("sorting")) {
		$(".sorting").removeClass("active");
		$(this).toggleClass("active");
		return setTimeout(function() { 
			magic()
		}, 0.25);
	};
	if ($(this).hasClass("printings")) {
		$(".printings").removeClass("active");
		$(this).toggleClass("active");
		return setTimeout(function() { 
			magic()
		}, 0.25);
	};
	if ($(this).hasClass("search-oracle-or-name")) {
		$(".search-oracle-or-name").removeClass("active");
	};
	$(this).toggleClass("active");
	event.stopPropagation();
});

document.getElementById("clear-button").onclick = function() {
	$("#clear-button").addClass("clicked-button");
	return setTimeout(function() { 
		reset()
	}, 250);

	function reset() {
	$("#clear-button").removeClass("clicked-button");
	document.getElementById("search-term").value = "";
	$("input").prop("checked", false);
	$("label").removeClass("active");
	$("#commander-legal").prop("checked", true);
	$("#cheapest").prop("checked", true);
	$("#sort-cmc").prop("checked", true);
	$("#search-oracle").prop("checked", true);
	$(".default").addClass("active");
	$("#commander-id").val("");
	searchOptions = "";
	sortBy = "";
	commanderId = "";
	oracleSearch = "";
	}
};

function magic() {
	$(".search-results").empty();
	let oracleSearch = $("input[type='radio'][name='oracle-or-name']:checked").val();
	let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
	let sortBy = $("input[type='radio'][name='sort']:checked").val();
	let commanderId = document.getElementById("commander-id").value;
	searchOptions = $("input[type='radio'][name='cheapest-or-all']:checked").val();
	for (let checkbox of markedCheckbox) {
		searchOptions += checkbox.value;
	}

	fetch(API_MAGIC + "?" + sortBy + "q=" + oracleSearch + searchValue + searchOptions + commanderId)
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
		searchValue = searchValue.replace(" o:", " ");
		let cardOrCards = "cards";
		(data.total_cards === 1 ? cardOrCards = "card" : cardOrCards = "cards");
		$("#results").text('You searched for "' + searchValue + '" and got ' + data.total_cards + ' ' + cardOrCards + '.');
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