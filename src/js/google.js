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













var GoogleMapModule = (function() {
	var shared = {};

	var map;
	var infowindow;
	var startingPoint = {lat: 33.813245, lng: -84.362171};
	shared.startingPoint = startingPoint; 
	var markers = [];

	function placeResults(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {

          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
	}

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

	shared.createMarker = createMarker;

	function removeMarkers(place){
		bounds = new google.maps.LatLngBounds();

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}

	shared.removeMarkers = removeMarkers

	// Call GoogleMapModule.searchForPlaces(term) to put places on map.

	function searchForPlaces(term, radius) {
		var r = radius || 500;
		var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: startingPoint,
          radius: r,
          keyword: term
        }, placeResults);
	}

	shared.searchForPlaces = searchForPlaces;
	
	function initMap() {
	   map = new google.maps.Map(document.getElementById('map'), {
	     center: startingPoint,
	     zoom: 14
	   });

	   infowindow = new google.maps.InfoWindow();

	   removeMarkers();

	   function getUsersMap_Success(position) {
	   		successStartingPoint = {lat: position.coords.latitude, lng: position.coords.longitude};
	   		map.setCenter(successStartingPoint);

	   		var userMarkerData = {};
	   		userMarkerData.coordinates = successStartingPoint;

	   		userMarkerData.content= '<h1>You are here</h1>';

	   		createMarker(userMarkerData);

	   		map.setZoom(12);
	   }

	   function getUsersMap_Error() {
	   		var defaultMarkerData = {};
	   		defaultMarkerData.coordinates = startingPoint;
	
	   		defaultMarkerData.content= '<h1>This HIV Locator was made at The Creative Circus in Atlanta, GA</h1>';
	
	   		createMarker(defaultMarkerData);       
	   }

	   navigator.geolocation.getCurrentPosition(getUsersMap_Success, getUsersMap_Error);
	   
	   shared.map = map;
	}

	shared.init = initMap;

	return shared;
}());

var GoogleMapModule = (function() {
	var shared = {}; 

	var map;
	var infowindow;
	var startingPoint = {lat: 33.813245, lng: -84.362171};
	var markers = [];

	//hw - button	- add event listener
	// make the search button link to searchForPlaces()
	// call the function inside the initMap function
	// make the search results show up in the dom in a list
	// make a content string to every marker that pops up after your search

	function setupListeners () {
		console.log('setupListeners()');

		var btn = document.querySelector('#btn');
		btn.addEventListener('click', searchForPlaces);
	}


	// this processes the data
	function placeResults(results, status) {

		console.log("placeResults", results, status);

	// if the search was successful, give results
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		console.log('got results');

		// make dom element
		var resultsUL = document.querySelector('.results');
		// clear out old results shows last item in array?????
		resultsUL.innerHTML = ''; 

		// go through array of results
		for (var i = 0; i < results.length; i++) {
		createMarker(results[i]);


		// make dom elements
		var li = document.createElement('li');
		


		// make li = the names in the results array
		li.innerHTML = results[i].name; 
		resultsUL.appendChild(li);
		}	
	} 
	}

	//create a new marker
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


	function searchForPlaces(evt) {

		// prevent default
		evt.preventDefault();
		console.log('searching places');

	// remove old markers
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		marker.setMap(null); //remove old marker
	}
	markers = [];

	var inputEl = document.querySelector('#query');
	var searchValue = inputEl.value;
	console.log('the search value is', searchValue);

	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({ // method that searches 
		location: startingPoint,
		radius: 500, //500 miles
		keyword: searchValue
	}, placeResults); // the results we get back

	}


	//test it
	shared.searchForPlaces = searchForPlaces;

	function initMap () {

	map = new google.maps.Map(document.getElementById('map'), {
		center: startingPoint,
		zoom: 8
	});

	var marker = new google.maps.Marker({
		position: startingPoint,
		map: map
	});

	var contentString = "<h1>hi,</h1> <p>I'm an <strong>explanation</strong> popup!</p>";
	infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	// open the infowindow popup box whne you click the marker
	marker.addListener('click', function() {
		infowindow.open(map, marker); //point to this map and this marker
	})

	setupListeners();

	}


	shared.init = initMap; //return/allow an object into our code

	return shared;

}());

