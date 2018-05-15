console.log(`Hello World`)

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
					// stuff...
				}

				return {
					initMap: initMap
					showMarkers: showMarkers
				}
			})();

			var YelpModule = (function() {
				// pseudo code:
				//while processing results, pass the business location to GoogleModule.showMarkers(locationArray);
			})
