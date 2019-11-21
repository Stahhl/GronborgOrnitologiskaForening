var hits = [];

function SearchItem() {
	hits = [];

	var searchId = $("#search-id").val();
	var searchPersonName = $("#search-person")
		.val()
		.toUpperCase();
	var searchBird = $("#search-bird")
		.val()
		.toUpperCase();
	var searchBirdFamily = $("#search-bird-family")
		.val()
		.toUpperCase();
	var searchLocation = $("#search-location")
		.val()
		.toUpperCase();
	var searchDatetime = $("#search-datetime")
		.val()
		.toUpperCase();

	if (searchId != "") {
		SearchId(searchId);
	}
	if (searchPersonName != "") {
		SearchPersonName(searchPersonName);
	}
	if (searchBird != "") {
		SearchBird(searchBird);
	}
	if (searchBirdFamily != "") {
		SearchBirdFamily(searchBirdFamily);
	}
	if (searchLocation != "") {
		SearchLocation(searchLocation);
	}
	if (searchDatetime != "") {
		SearchDatetime(searchDatetime);
	}

	DrawHits();
}
function ResetSearch(){
	console.log("ResetSearch");	
	getData();
}
function DrawHits() {
	$.each(hits, function(key, item) {
		console.log("hit: " + item.id + " " + item.personName);

		const tBody = $("#birds");

		$(tBody).empty();

		$.each(hits, function(key, item) {
			var number = birdNames.indexOf(item.birdName);
			const tr = $("<tr></tr>")
				.append($("<td></td>").text(item.id))
				.append($("<td></td>").text(item.personName))
				.append($("<td></td>").text(item.birdName))
				.append($("<td></td>").text(birdFamilies[number]))
				.append($("<td></td>").text(item.location))
				.append($("<td></td>").text(item.dateAndTime))

				.append(
					$("<td></td>").append(
						$("<button>Edit</button>").on("click", function() {
							editItem(item.id);
						})
					)
				)
				.append(
					$("<td></td>").append(
						$("<button>Delete</button>").on(
							"click",
							function() {
								deleteItem(item.id);
							}
						)
					)
				);

			tr.appendTo(tBody);
		});

		birds = hits;
	});
}
function SearchId(term) {
	console.log("SearchId");

	$.each(birds, function(key, item) {
		if (item.id == term && hits.includes(item) == false) {
			hits.push(item);
		}
	});
}
function SearchPersonName(term) {
	console.log("SearchPersonName");

	$.each(birds, function(key, item) {
		if (
			item.personName.toUpperCase().includes(term) == true &&
			hits.includes(item) == false
		) {
			hits.push(item);
		}
	});
}
function SearchBird(term) {
	console.log("SearchBird: " + term);

	$.each(birds, function(key, item) {
		if (item.birdName.toUpperCase().includes(term) && hits.includes(item) == false) {
			hits.push(item);
		}
	});
}
function SearchBirdFamily(term) {
	console.log("SearchBirdFamily");

	$.each(birds, function(key, item) {
		if (item.birdFamily.toUpperCase().includes(term) && hits.includes(item) == false) {
			hits.push(item);
		}
	});
}
function SearchLocation(term) {
	console.log("SearchLocation");

	$.each(birds, function(key, item) {
		if (item.location.toUpperCase().includes(term) && hits.includes(item) == false) {
			hits.push(item);
		}
	});
}
function SearchDatetime(term) {
	console.log("SeacrhDatetime");

	$.each(birds, function(key, item) {
		if (item.dateAndTime.toUpperCase().includes(term) && hits.includes(item) == false) {
			hits.push(item);
		}
	});
}
