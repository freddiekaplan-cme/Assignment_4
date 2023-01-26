$(function() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	  });
	  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
	  let value = params.cardName; // "some_value"
	  console.log("value: ", value);
	  
	  $("h1").text(value);
});