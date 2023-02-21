Hi Freddie!

WOW!! This is excellent!

You went way overboard and wrote about 10 times as much code as you needed to, but can barely find any kind of improvement feedback to give you! You absolutely nailed it, extremely well done.

The only things I can comment on:
  in the JS you have a mix of jQuery and vanilla JS when targeting selectors. While this isn't wrong, it's unusual - jQuery does the same thing in fewer lines, for example line 12-13 of api-script.js shows 2 different ways of targeting the same element

  document.getElementById("search-button").onclick = function() {
	  $("#search-button").addClass("clicked-button");

  It's a bit more readable if you indent everything inside the $(function() { .. }) call

  Line 103 to 186 - everything inside here should be indented

  In scripts.js you have $(document).ready(function(){ which is redundant because it's been superseded by the opening $(function() { call

That's it, VG, 15/10 and I'm blown away with how much passion and creativity you have shown in this assignment. Awesome stuff!

*************************************

CRITERIA FOR GRADING

*************************************

GODKÄNT:
-------------------------------------

Connect to an API ✅

User fired event to launch the fetch ✅

Data is returned and handled efficiently ✅ ✅

Display more than one property of the returned data ✅

RWD
  Desktop
  Mobile

-------------------------------------

VÄLGODKÄNT:
-------------------------------------

Error handling when fetching the data ✅

Append arguments to the request ✅

Multiple calls to the API ✅

Code style ✅ ✅ ✅