var searchString = "lion"
var apiURL
var gihpyFav = []
var favresponseIndex
var currentstorageIndex = localStorage.length - 1;
progObj = {
	selectorIndex: "",
	prepopulatedSearhes: ["funny cats", "nba highlights", "nfl highlights", "funny dog", "historical quotes"],
	apitapFav: function (index) {
		fetch(apiURL).then(function (response) {
			return response.json();
		})
			.then(function (response) {
				console.log(response)
				img = new Image();
				img.src = response.data[index].images.fixed_height_still.url
				$(img).attr("data-play", response.data[index].images.fixed_height.url);
				$(img).attr("state", "paused");
				$(img).addClass("card-img-top");
				$(img).attr("data-pause", response.data[index].images.fixed_height_still.url);
				card = $('<div class="card" style="width: 18rem;">');
				card.attr("id", searchString + i)
				cardbody = $('<div class="card-body border border-primary">');
				cardtext = $('<p class="card-text">');
				cardtext.text("rating: " + response.data[index].rating)
				card.append(img);
				card.append(cardbody);
				cardbody.append(cardtext);
				cardbody.append('<p class="card-text"> title: ' + response.data[index].title + '<p>')
				$("#favgiphy").append(card);
			});
	},
	apiTap: function () {
		$("#newgiphy").empty();
		fetch(apiURL).then(function (response) {
			return response.json();
		})
			.then(function (response) {
				console.log(response)

				//active image and active image state and current state being appended as play
				for (i = 0; i < response.data.length; i++) {
					img = new Image();
					img.src = response.data[i].images.fixed_height_still.url
					$(img).attr("data-play", response.data[i].images.fixed_height.url);
					$(img).attr("state", "paused");
					$(img).addClass("card-img-top");
					$(img).attr("data-pause", response.data[i].images.fixed_height_still.url);
					card = $('<div class="card" style="width: 18rem;">');
					card.attr("id", searchString + i)
					cardbody = $('<div class="card-body border border-primary">');
					cardtext = $('<p class="card-text">');
					cardtext.text("rating: " + response.data[i].rating)
					card.append(img);
					card.append(cardbody);
					cardbody.append(cardtext);
					cardbody.append('<p class="card-text"> title: ' + response.data[i].title + '<p>')
					favButton = $('<button type="button" id="favorite" class="btn btn-primary">Favorite</button>')
					$(favButton).attr("apiindex", i)
					$(favButton).attr("apiurl", apiURL)
					$(favButton).attr("parent", searchString + i)
					cardbody.append(favButton)
					$("#newgiphy").append(card);
				}
			})
	},

	renderButton: function () {
		searchString = this.prepopulatedSearhes[i];
		button = $("<button>");
		button.addClass("giphy");
		button.text(searchString);
		searchString = searchString.trim().replace(/ /g, "+");
		button.attr("data-search", searchString)
		button.prependTo("#buttons");
	}

}

$(document).ready(function () {
	for (i = 0; i < progObj.prepopulatedSearhes.length; i++) {
		progObj.renderButton();
	}
	console.log(localStorage.length)
	for (i = 0; i < localStorage.length; i++) {
		console.log(localStorage.key(i))
		if (localStorage.key(i).includes("favobj") === true) {
			var retrievedobj = JSON.parse(localStorage.getItem(localStorage.key(i)
		));
		console.log(retrievedobj);
			apiURL = retrievedobj.apiURL
			favresponseIndex = retrievedobj.apiindex

			progObj.apitapFav(favresponseIndex);
		}
	}
});

$(document).on("click", ".giphy", function () {
	searchString = $(this).attr("data-search");
	apiURL = "http://api.giphy.com/v1/gifs/search?q=" + searchString + "&limit=10&api_key=LqPD23bBo3xDVpkvjWxSlE29NgGb9IUp";
	progObj.apiTap();
});

$(document).on("click", "img", function () {
	imgState = $(this).attr("state");
	if (imgState === "playing") {
		$(this).attr("src", $(this).attr("data-pause"));
		$(this).attr("state", "paused");
	} else {
		$(this).attr("src", $(this).attr("data-play"));
		$(this).attr("state", "playing");
	}
})

$(document).on("click", "#favorite", function () {
	currentstorageIndex = currentstorageIndex + 1
	locstorObject = {};
	locstorObject.apiURL = $(this).attr("apiurl");
	locstorObject.apiindex = $(this).attr("apiindex");
	console.log(locstorObject);	
	localStorage.setItem('favobj' + currentstorageIndex, JSON.stringify(locstorObject));
	targetcard = $(this).attr("parent")
	document.getElementById('favgiphy').appendChild(document.getElementById(targetcard));
});

$(document).on("click", "#search", function (event) {
	event.preventDefault();
	prepopulatedSearches.push($("#searchTerm").val());
	$("#buttons").empty();
	progObj.renderButton();
	$("#searchTerm").val("");
});
