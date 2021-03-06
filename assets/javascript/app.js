var searchString = "lion"
var apiURL
var gihpyFav = []
var favresponseIndex
var currentstorageIndex = localStorage.length - 1;
progObj = {
	selectorIndex: "",
	rowfCount: 1,
	picfRow: 0,
	rowCount: 1,
	picRow: 0,
	prepopulatedSearches: ["funny cats", "nba highlights", "nfl highlights", "funny dog", "historical quotes"],
	apitapFav: function (index) {
		fetch(apiURL).then(function (response) {
			return response.json();
		})
			.then(function (response) {
				img = new Image();
				img.src = response.data[index].images.fixed_height_still.url
				$(img).attr("data-play", response.data[index].images.fixed_height.url);
				$(img).attr("state", "paused");
				$(img).addClass("card-img-top");
				$(img).attr("data-pause", response.data[index].images.fixed_height_still.url);
				column = $("<div class = 'col-sm-3'>")
				card = $('<div" style="width: 18rem;">');
				card.attr("id", searchString + i)
				cardbody = $('<div class="card-body border border-primary">');
				cardtext = $('<p class="card-text">');
				cardtext.text("rating: " + response.data[index].rating)
				cardbody.append('<p class="card-text"> title: ' + response.data[index].title + '<p>')
				card.append(img);
				card.append(cardbody);
				cardbody.append(cardtext);
				column.append(card);
				if (progObj.rowfCount===1) {
					progObj.picfRow++
					$("#favgiphy").append($('<div class="row F' + progObj.picfRow + '">'))
					$("#favgiphy").append($('<div class="row spacer">'))
				}
				else if (progObj.rowfCount===4) {
					progObj.rowfCount=0;
				}
				$(".F" + progObj.picfRow).append(column);
				progObj.rowfCount++;
			});
	},
	apiTap: function () {
		$("#newgiphy").empty();
		fetch(apiURL).then(function (response) {
			return response.json();
		})
			.then(function (response) {
				//active image and active image state and current state being appended as play
				for (i = 0; i < response.data.length; i++) {
					img = new Image();
					img.src = response.data[i].images.fixed_height_still.url
					$(img).attr("data-play", response.data[i].images.fixed_height.url);
					$(img).attr("state", "paused");
					$(img).addClass("card-img-top");
					$(img).attr("data-pause", response.data[i].images.fixed_height_still.url);
					column = $("<div class = 'col-sm-3'>")
					card = $('<div class="card">');
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
					column.append(card);
					if (progObj.rowCount===1) {
						progObj.picRow++
						$("#newgiphy").append($('<div class="row N' + progObj.picRow + '">'))
						$("#newgiphy").append($('<div class="row spacer">'))
					}
					else if (progObj.rowCount===4) {
						progObj.rowCount=0;
					}
					$(".N" + progObj.picRow).append(column);
					progObj.rowCount++;
				}
			})
	},

	renderButton: function () {
		searchString = progObj.prepopulatedSearches[i];
		if (searchString === undefined) {
			searchString= $("#searchTerm").val();
		} 
		button = $("<button>");
		button.addClass("giphy");
		button.text(searchString);
		searchString= searchString.trim();
		if (searchString.includes(" ")) {
			searchString = searchString.replace(/ /g, "+");
		}
		button.attr("data-search", searchString)
		button.prependTo("#buttons");
	}

}

$(document).ready(function () {
	for (i = 0; i < progObj.prepopulatedSearches.length; i++) {
		progObj.renderButton();
	}
	for (i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).includes("favobj") === true) {
			var retrievedobj = JSON.parse(localStorage.getItem(localStorage.key(i)
		));
			apiURL = retrievedobj.apiURL
			favresponseIndex = retrievedobj.apiindex

			progObj.apitapFav(favresponseIndex);
		}
	}
});

$(document).on("click", ".giphy", function () {
	searchString = $(this).attr("data-search");
	apiURL = "https://api.giphy.com/v1/gifs/search?q=" + searchString + "&limit=10&api_key=LqPD23bBo3xDVpkvjWxSlE29NgGb9IUp";
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
	string = ".F" + progObj.rowfCount
	console.log(progObj.rowfCount)
	console.log(progObj.picfRow)
	currentstorageIndex = currentstorageIndex + 1
	locstorObject = {};
	locstorObject.apiURL = $(this).attr("apiurl");
	locstorObject.apiindex = $(this).attr("apiindex");
	localStorage.setItem('favobj' + currentstorageIndex, JSON.stringify(locstorObject));
	if (progObj.rowfCount !== 5 & progObj.picfRow !==0) {
	progObj.rowfCount++
	targetcard = $(this).closest(".col-sm-3")
	$('.F' + progObj.picfRow).append(targetcard);
}
else{
	progObj.picfRow++
	$("#favgiphy").append("<div class = 'row spacer'>");
	$("#favgiphy").append($("<div class = 'row F" +progObj.picfRow+"'>"));
	targetcard = $(this).closest(".col-sm-3");
	$('.F' + progObj.picfRow).append(targetcard);
	progObj.rowfCount++;
	if (progObj.rowfCount === 5) {
	progObj.rowfCount = 1;}
}
});

$(document).on("click", "#search", function (event) {
	event.preventDefault();
	progObj.prepopulatedSearches.push($("#searchTerm").val());
	progObj.renderButton();
	$("#searchTerm").val("");
});
