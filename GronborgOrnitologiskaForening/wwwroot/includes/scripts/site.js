const uri = "api/Gof";
let birds = null;
let birdNames = [];
let birdFamilies = [];
function getCount(data) {
	console.log("getCount");
	const el = $("#counter");
	let name = "to-do";
	if (data) {
		if (data > 1) {
			name = "bird watched";
		}
		el.text(data + " " + name);
	} else {
		el.text("No " + name);
	}
}

$(document).ready(function() {
	console.log("ready");

	setupArrays();
	getData();
});
function setupArrays() {
	birdNames.push("Berguv");
	birdNames.push("Blåmes");
	birdNames.push("Canadagås");
	birdNames.push("Duva");
	birdNames.push("Fasan");
	birdNames.push("Fiskmås");
	birdNames.push("Gräsand");
	birdNames.push("Gulsparv");
	birdNames.push("Hussvala");
	birdNames.push("Kråka");
	birdNames.push("Kungsörn");
	birdNames.push("Pilfink");
	birdNames.push("Skata");
	birdNames.push("Sädesärla");
	birdNames.push("Talgoxe");

	birdFamilies.push("Ugglor");
	birdFamilies.push("Mesar");
	birdFamilies.push("Änder");
	birdFamilies.push("Duvfåglar");
	birdFamilies.push("Fasanfåglar");
	birdFamilies.push("Måsfåglar");
	birdFamilies.push("Andfåglar");
	birdFamilies.push("Fältsparvar");
	birdFamilies.push("Svalor");
	birdFamilies.push("Kråkfåglar");
	birdFamilies.push("Hökartade rovfåglar");
	birdFamilies.push("Sparvfinkar");
	birdFamilies.push("Kråkfåglar");
	birdFamilies.push("Ärlor");
	birdFamilies.push("Mesar");
}
function getData() {
	console.log("getData");
	// var x = innerHTML('<a href="https://sv.wikipedia.org/wiki/Fiskmås">Visit W3Schools</a>');

	$.ajax({
		type: "GET",
		url: uri,
		cache: false,
		success: function(data) {
			const tBody = $("#birds");

			$(tBody).empty();

			getCount(data.length);

			$.each(data, function(key, item) {
				var link = "https://sv.wikipedia.org/wiki/" + item.birdName;
				var number = birdNames.indexOf(item.birdName);

				const tr = $("<tr></tr>")
					.append($("<td></td>").text(item.id))
					.append($("<td></td>").text(item.personName))
					.append(
						$(
							"<td><a href=' " +
								link +
								" '> " +
								item.birdName +
								" </a></td>"
						)
					)
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

			birds = data;
			//graph();
		}
	});
}

function addItem() {
	console.log("addItem");
	const item = {
		personName: $("#add-person").val(),
		birdName: $("#add-bird").val(),
		birdFamily: $("#add-bird-family").val(),
		location: $("#add-location").val(),
		dateAndTime: $("#add-datetimes").val()
	};

	$.ajax({
		type: "POST",
		accepts: "application/json",
		url: uri,
		contentType: "application/json",
		data: JSON.stringify(item),
		error: function(jqXHR, textStatus, errorThrown) {
			var x = $("#dateAndTime").val("");

			alert("Something went wrong: " + x);
		},
		success: function(result) {
			getData();
			$("#add-person").val("");
			$("#add-bird").val("");
			$("#add-bird-family").val("");
			$("#add-location").val("");
			$("#dateAndTime").val("");
		}
	});
}

function deleteItem(id) {
	console.log("deleteItem: " + uri + "/" + id);
	$.ajax({
		url: uri + "/" + id,
		type: "DELETE",
		success: function(result) {
			getData();
		}
	});
}

function editItem(id) {
	console.log("editItem: " + id);
	$.each(birds, function(key, item) {
		if (item.id === id) {
			$("#edit-person").val(item.personName);
			$("#edit-bird").val(item.birdName);
			$("#edit-bird-family").val(item.birdFamily);
			$("#edit-location").val(item.location);
			$("#edit-datetimes").val(item.dateAndTime);
			$("#edit-id").val(item.id);
		}
	});
	$("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function() {
	const item = {
		personName: $("#edit-person").val(),
		birdName: $("#edit-bird").val(),
		birdFamily: $("#edit-bird-family").val(),
		location: $("#edit-location").val(),
		id: $("#edit-id").val(),
		dateAndTime: $("#edit-datetimes").val()
	};

	$.ajax({
		url: uri + "/" + $("#edit-id").val(),
		type: "PUT",
		accepts: "application/json",
		contentType: "application/json",
		data: JSON.stringify(item),
		success: function(result) {
			getData();
		}
	});

	closeInput();
	return false;
});

function closeInput() {
	$("#spoiler").css({ display: "none" });
}

function getDate() {
	console.log("getDate");
	$(function() {
		$('input[name="datetimes"]').daterangepicker({
			timePicker: true,
			timePicker24Hour: true,
			singleDatePicker: true,
			startDate: moment().startOf("hour"),
			locale: {
				format: "DD/M/YY hh:mm ",
				daysOfWeek: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
			}
		}),
			function() {
				console.log("start = " + locale);
				return locale;
			};
	});
}

// function graph() {

// 	var chart = new CanvasJS.Chart("chartContainer", {
// 		animationEnabled: true,
// 		title: {
// 			text: "Bird watched"
// 		},
// 		data: [
// 			{
// 				type: "pie",
// 				startAngle: 240,
// 				yValueFormatString: '##0.00"%"',
// 				indexLabel: "{label} {y}",
// 				dataPoints: [
// 					{ y: 79.45, label: "Blåmes" },
// 					{ y: 7.31, label: "Kungsörn" },
// 					{ y: 7.06, label: "Talgoxe" },
// 					{ y: 4.91, label: "Gräsand" },
// 					{ y: 1.26, label: "Sädesärla" }
// 				]
// 			}
// 		]
// 	});
// 	chart.render();
// 	birdQuote("Blåmes");
// 	birdQuoteSuccess(birdQuote, function(results) {
// 		console.log("birdQuoteSuccess");
// 	});
// };

// function birdQuote(birdName) {
// 	var nominator = 0;
// 	var denominator = 0;

// 	console.log("birdQuote - 1");

// 	$.ajax({
// 		type: "GET",
// 		url: uri,
// 		cache: false,
// 		success: function(data) {
// 			console.log("birdQuote - 2");

// 			nominator = data.length;

// 			$.each(birds, function(key, item) {

// 				if (item.birdName == birdName) {
// 				console.log("birdQuote - 3");

// 					denominator = denominator + 1;
// 				}
// 			});
// 			console.log("birdQuote: " + nominator + " / " + denominator + " = " + (nominator / denominator));
// 			callback(nominator / denominator);
// 		}
// 	});
// }
