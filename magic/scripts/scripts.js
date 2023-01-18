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

})