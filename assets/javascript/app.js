var searchString = "lion"
var apiURL
progObj = {
	selectorIndex:"",
    prepopulatedSearhes: ["funny cats" , "nba highlights", "nfl highlights", "funny dog", "historical quotes"],

	apiTap: function() {fetch(apiURL).then(function (response) {
	return response.json();
	})
	.then(function (response) {
		console.log(response)

		//active image and active image state and current state being appended as play
		for (i=0; i<progObj.prepopulatedSearhes.length; i++) { 
			img=new Image();
			img.src=response.data[i].images.fixed_height_still.url
			$(img).attr("data-play", response.data[i].images.fixed_height.url);
			$(img).attr("state", "paused");
			$(img).addClass("card-img-top");
			$(img).attr("data-pause", response.data[i].images.fixed_height_still.url);
			card = $('<div class="card" style="width: 18rem;">');
			cardbody = $('<div class="card-body border border-primary">');
			cardtext = $('<p class="card-text">');
			cardtext.text("rating: " + response.data[i].rating)
			card.append(img);
			card.append(cardbody);
			cardbody.append(cardtext);
			cardbody.append('<p class="card-text"> title: ' + response.data[i].title + '<p>')
			$("#newgiphy").append(card);
		}
	})},
  
	renderButton : function () {
		searchString = this.prepopulatedSearhes[i];
		button = $("<button>");
		button.addClass("giphy");
		button.text(searchString);
		searchString=searchString.trim().replace(/ /g,"+");
		button.attr("data-search",searchString) 
		button.prependTo("#buttons");
	}

}

$(document).ready(function() {
	for (i = 0; i<progObj.prepopulatedSearhes.length; i++) {
		progObj.renderButton();
	}
	});
		
$(document).on("click", ".giphy", function() {
	searchString = $(this).attr("data-search");
	apiURL = "http://api.giphy.com/v1/gifs/search?q=" + searchString + "&limit=10&api_key=LqPD23bBo3xDVpkvjWxSlE29NgGb9IUp";
	progObj.apiTap();
});

$(document).on("click", "img", function() {
	imgState = $(this).attr("state");
	if (imgState === "playing") {
		$(this).attr("src", $(this).attr("data-pause"));
		$(this).attr("state", "paused");
	  } else {
		$(this).attr("src", $(this).attr("data-play"));
		$(this).attr("state", "playing");
	  }
})

// if (imgState === "pause") {
// 	$(this).attr("src", $(this).attr("data-play"));
// 	$(this).append("data-state", "animate");
// }

// else {
// 	$(this).attr("src", $(this).attr("data-pause"));
// 	$(this).append("data-state", "pause");
// }

