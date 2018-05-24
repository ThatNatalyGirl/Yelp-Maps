console.log(`Die In a Fire`)


var GoogleModule = (function(){	
				
	var map;
	function initMap() {
		var daegu = {lat: 35.8714, lng: 128.6014};
		map = new google.maps.Map(document.getElementById('map'), {
			center: daegu,
			zoom: 14
		});

		var infoWindow = new google.maps.InfoWindow({
			content: 'Welcome to Daegu!!!'
		});

		var marker = new google.maps.Marker({
			position: daegu,
			map: map
		});

		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		})
	}

	function showMarkers(locationArray) {
		function createMarker(place) {
			var marker = new google.maps.Marker({
				map: map,
				position: place.coordinates,
				icon: place.icon
			});

			marker.addListener('click', function() {
				infowindow.setContent(place.content);
				infowindow.open(map, marker);
			})

			markers.push(marker);

			bounds.extend(place.coordinates);
			map.fitBounds(bounds);

			return marker;
		}


		function createMarker(place) {

			var placeLatLng = place.geometry.location; 
			var marker = new google.maps.Marker({
				map: map,
				position: placeLatLng
		});

		marker.addListener('click', function() {
			infowindow.setContent(place.name); // overriding content in the info window everytime you click marker
			infowindow.open(map, marker);
		})

		markers.push(marker);

		}


	shared.createMarker = createMarker;
	}

	return {
		initMap: initMap
		showMarkers: showMarkers
	}
})();

var YelpModule = (function() {
	// pseudo code:
	//while processing results, pass the business location to GoogleModule.showMarkers(locationArray);
})();









