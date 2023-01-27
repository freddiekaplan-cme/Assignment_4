$(function() {
	
$("#nav").on("click", function() {
	$(".menu").toggleClass("active");
});

$(document).ready(function(){
	$(".close-menu").click(function(){
		if ($(".menu").hasClass("active")) {
			$(".menu").removeClass("active");
		}
	});
  });

$("#list-control-copy").click(function() {
	listOfCards = document.getElementById("the-list").value;
	navigator.clipboard.writeText(listOfCards);
	$("#list-control-copy").text("🗸");
	setTimeout(function() { 
		$("#list-control-copy").text("Copy");
	}, 1000);
});

$("#show-list-from-nav").click(function() {
	if ($("#the-list-container").hasClass("fullscreen")) {
		$("#the-list-container").removeClass("active");
		$("#the-list-container").removeClass("fullscreen");
	} else {
		toggleList();
		$("#the-list-container").addClass("fullscreen");
	}
});

function toggleList() {
	if ($("#the-list-container").hasClass("active")) {
		$("#the-list-container").removeClass("active");
		$("#the-list-container").removeClass("fullscreen");
	} else {
		$("#the-list-container").addClass("active");
	}	
}

$("#list-control-hide").click(function() {
	toggleList();
});

$("#list-button").click(function() {
	toggleList();
});

$("#list-control-clear").click(function() {
	document.getElementById("the-list").value = "";
});

})