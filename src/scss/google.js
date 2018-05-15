var GoogleMapModule = (function() {

	var map;
	function initMap() {
		var circusPosition = {lat: 33.813245, lng: -84.362171};
		map = new google.maps.Map(document.getElementById('map'), {
			center: circusPosition,
			zoom: 16
		});

		var infoWindow = new google.maps.InfoWindow({
			content: 'Welcome to the circus!'
		});

		var marker = new google.maps.Marker({
			position: circusPosition,
			map: map
		});
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		})
	}

	function showMarkers(locationsArray) {

	}
	
	return {
		initMap: initMap,
		showMarkers: showMarkers
	}
})();

var YelpModule = (function() {

	// pseudo code:
	// while procesing results, pass the 
	// business locations to 
	// GoogleMapModule.showMarkers(locationsArray);

})();