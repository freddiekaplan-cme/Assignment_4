$(function() {
	
const API_MAGIC = "https://api.scryfall.com/cards/search";
let searchValue = "";
let input = document.getElementById("search-term");
let searchOptions = "";
let sortBy = "";
let commanderId = "";
let oracleSearch = "";
let copyCardInput = "";

document.getElementById("search-button").onclick = function() {
	$("#search-button").addClass("clicked-button");
	return setTimeout(function() { 
		searchButton()
	}, 500);
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
		searchValue = searchValue.replace(/ /g, " +o:");

		// $("a:contains('New')").html(function(i, text) {
		// 	return text.replace(/New/g, '<span class="new">New</span>');
		// });

	}

	$(".search-results").empty();
	searchOptions = "";
	sortBy = "";
	commanderId = "";
	oracleSearch = "";
	magic();
}

//colors med färgerna sätt active även på diven bakom
$("label").click(function(event) {
	if ($(this).hasClass("sorting")) {
		$(".sorting").removeClass("active");
		$(this).toggleClass("active");
	};
	if ($(this).hasClass("printings")) {
		$(".printings").removeClass("active");
		$(this).toggleClass("active");
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
	}, 300);

function reset() {
	document.getElementById("search-term").value = "";
	$("#clear-button").removeClass("clicked-button");
	$("input").prop("checked", false);
	$("label").removeClass("active");
	$(".marked-color").removeClass("active");
	$("#commander-legal").prop("checked", true);
	$("#cheapest").prop("checked", true);
	$("#sort-cmc").prop("checked", true);
	$("#search-oracle").prop("checked", true);
	$(".default").addClass("active");
	$("#commander-id").val("");
	$("#results").empty();
	$(".search-results").empty();
	searchOptions = "";
	sortBy = "";
	commanderId = "";
	oracleSearch = "";
	}
};

function magic() {
	$(".search-results").empty();
	let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
	oracleSearch = $("input[type='radio'][name='oracle-or-name']:checked").val();
	sortBy = $("input[type='radio'][name='sort']:checked").val();
	commanderId = document.getElementById("commander-id").value;
	searchOptions = $("input[type='radio'][name='cheapest-or-all']:checked").val();
	for (let checkbox of markedCheckbox) {
		searchOptions += checkbox.value;
	}

	fetch(API_MAGIC + "?" + sortBy + "q=" + oracleSearch + searchValue + searchOptions + commanderId)
		.then((response) => {
			if (!response.ok) {
				return Promise.reject(response);
			}
			return response.json();
		})
		.then((data) => {
		
		function createResults() {
			const $resultDiv = $(".search-results");
			let cardLabel = (data.total_cards === 1 ? "card" : "cards");	

			searchValue = searchValue.replace(/o:/g, " ");

			$("#results").text('You searched for "' + searchValue + '" and got ' + data.total_cards + ' ' + cardLabel + '.');

			function isDoubleSided(cardType) {
				const dualTypes = {
					transform: true,
					modal_dfc: true,
					art_series: true,
					double_faced_token: true,
					reversible_card: true
				};

				return dualTypes[cardType];
			}

			data.data.forEach(function (card) {
				//const HYPHEN = "'";
				let cardFace = "";
				let magicCard = "";
				let cardImage = "";
				let cardPrice = (card.prices.usd === null ? "N/A" : card.prices.usd);
				//(card.prices.usd === null ? card.prices.usd = "N/A" : card.prices.usd)

				// const isDoubleSided = (card.layout === "transform" || card.layout === "modal_dfc" || card.layout === "art_series" || card.layout === "double_faced_token" || card.layout === "reversible_card");

				const copyLabel = $('<span>$' + card.prices.usd + ' </span><label for="input' + card.id + '" class="copy-card-name">Copy <span class="clipboard-emoji" id="clipboard-emoji' + card.id + '">📋</span></label>');
				const infoContainer = $("<input class='card-name-copy' name='input" + card.id + "' id='input" + card.id + "' value='" + card.name + "'></input>");

				// if (card.name.includes(HYPHEN) ) {
				// 	console.log("hyphen");
				// 	card.name.replace(/'/g, "%27");
				// }

				if (isDoubleSided(card.layout)) {		
					magicCard = $("<div id='" + card.id + "' class='card-item'>");
					$resultDiv.append(magicCard);

					cardImage = $("<div class='card-image'>").html("<img class='" + card.id + " card-face side-one' src='" + card.card_faces[0].image_uris.normal + "'><img class='" + card.id + " card-face side-two hidden' src='" + card.card_faces[1].image_uris.normal + "'>").appendTo($(magicCard));

					let turnCard = $("<button id='turn" + card.id + "' class='turn-card-over'>").text("↩️").appendTo(cardImage);

					turnCard.on("click", function() {
						$("." + card.id).toggleClass("hidden");
					});

				} else {
					cardFace = card.image_uris.normal;
					magicCard = $("<div id='" + card.id + "'>").appendTo($resultDiv);
					cardImage = $("<div class='card-image'>").html("<img class='card-face' src='" + cardFace + "'>").appendTo($(magicCard));
				};

				magicCard.append(infoContainer);
				magicCard.append(copyLabel);

				cardImage.on("click", function() {
					window.open(`test.html?cardName=${card.name}&cardPrice=${cardPrice}`, '_blank');
					//let w = window.open("");

					// w.document.writeln('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./styles/style.css"><script src="./scripts/jquery-3.6.2.min.js"></script><script defer src="./scripts/api-script.js"></script><title>' + card.name + '</title></head><body><header><h1>' + card.name + '</h1></header><main><div><img class="image" src="' + cardFace + '"><br>$' + cardPrice + '</div><div class="unique-prints"></div></main><footer>&copy; Freddie Kaplan 2023</footer></body></html>');
				});
/*
				document.getElementsByClassName("copy-card-name").onclick = function(event) {
					//let copyCardName = card.name;
					//copyCardName.select();
					//copyCardName.setSelectionRange(0, 99999);
					navigator.clipboard.writeText(copyCardName.value);
					//hur får jag tag på värdet?
					event.stopPropagation();
				}
*/
				copyLabel.click(function(e) {
				
					// copy text TO the clipboard
					//navigator.clipboard.writeText('This text is now in the clipboard');
					//document.getElementById("commander-id").value
					//e.stopPropagation();
					//document.getElementsByClassName("copy-card-name").onclick = function(event) {
					copyCardInput = document.getElementById("input" + card.id).value;
					console.log(copyCardInput);
					//return copyCardName(copyCardInput);
					navigator.clipboard.writeText(copyCardInput);
					$("#clipboard-emoji" + card.id).text("🗸");
					setTimeout(function() { 
						$("#clipboard-emoji" + card.id).text("📋");
					}, 1000);
				});

				//function copyCardName(input) {
					//copyCardInput.select();
					//copyCardInput.setSelectionRange(0, 99999);
					//navigator.clipboard.writeText(input);
				//}

				/*

				$(".copy-card-name").click(function(event) {
					let copyCardName = card.name;
					copyCardName.select();
					copyCardName.setSelectionRange(0, 99999);
					navigator.clipboard.writeText(copyCardName.value);
					//hur får jag tag på värdet?
					event.stopPropagation();
				});
				*/

				window.location = "#results";

			})
		}
		createResults();
		
		//end fecth
		})
		.catch(error => {
			if (error.status === 404) {
				$("#results").text("No cards found.");
			}
			else if (error.status === 400) {
				$("#results").text("All of your search terms were ignored.");
			}
		});
//end magic function
}
//end jQuery
})