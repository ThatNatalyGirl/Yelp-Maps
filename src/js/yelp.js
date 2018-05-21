console.log('Top test')

var yelpAddress = [];

var YelpModule = (function() {

	const API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';

	const termEl = document.getElementById('term');
	const locationEl = document.getElementById('location');
	const searchBtn = document.getElementById('search');
	const resultsEl = document.getElementById('results');

	searchBtn.addEventListener('click', function(e) {
		e.preventDefault();
		const queryTerm = termEl.value;
		const location = locationEl.value;
		const prices = getCheckedValues(document.querySelectorAll('[name=price]:checked'));
		console.log('queryTerm', queryTerm);
		console.log('prices', prices);
		searchYelp({
			'location': location, 
			'term': queryTerm, 
			'price': prices
		});
	})

	function getCheckedValues(checkedItems) {
		console.log('checkedItems', checkedItems)
		// Option 1: the old-school JS way
		// let allChecked = '';
		// for (var i = checkedItems.length - 1; i >= 0; i--) {
		// 	var checkedItem = checkedItems[i].value
		// 	console.log('checkedItem', checkedItem)
		// 	allChecked = allChecked + ',' + checkedItem
		// }
		// End Option 1;
		// Option 2: the ES6 way
		const checkedValues = [...checkedItems].map(function(checkedItem) {
			return checkedItem.value;
		});
		const allChecked = checkedValues.join(',');
		// end Option 2
		console.log('allChecked', allChecked);
		// 
		return allChecked
	}

	function displayArticle(currentBusiness) {
		const title = currentBusiness.name;
		// pick any kind of default fallback image
		let thumbnail = currentBusiness.image_url;
		const currentBusinessLocation = currentBusiness.location;
		const url = currentBusiness.url;

		const liEl = document.createElement('li');
		const linkEl = document.createElement('a');
		const imgEl = document.createElement('img');
		//ask about how to define mutliple var at the same time
		let pAddressEl = document.createElement('p');
		let p$El = document.createElement('p');
		let pRatingEl = document.createElement('p');

		const pEl = document.createTextNode(title);
		linkEl.href = url;
		imgEl.src = thumbnail;

		pAddressEl.innerHTML = currentBusinessLocation.address1 + "<br/>" + currentBusinessLocation.city + ", " + currentBusinessLocation.state + " " + currentBusinessLocation.zip_code; 
		p$El.innerHTML = currentBusiness.price;
		pRatingEl.innerHTML = "Rating " + currentBusiness.rating;

		liEl.appendChild(linkEl);
		linkEl.appendChild(pEl);
		linkEl.appendChild(imgEl);
		liEl.appendChild(pAddressEl);
		liEl.appendChild(p$El);
		liEl.appendChild(pRatingEl);

		resultsEl.appendChild(liEl);

		yelpAddress.push(currentBusinessLocation);

	}

	function displayArticles(articleArray) {
		console.log("HeyO");
		console.log(articleArray.length);
		if (articleArray.length) {
			resultsEl.innerHTML = '';
			for (var i = 0; i <= articleArray.length - 1; i++) {
			var tempArrayElement = articleArray[i];			
			displayArticle(tempArrayElement);
			}
			// now add the new results	
			console.log("Here I am")		
		}	


	}

	// we no longer need these as individual parameters:
	// location, queryTerm, prices, rating, option1, option2
	/* options is an {}
	which could look something like:
	
	options = {
		location: location,
		queryTerm: queryTerm,
		prices: prices,
		// etc
	}
	*/
	function searchYelp(options) {

		const searchParams = Object.assign({}, options, {
			'_ep': '/businesses/search',
		})
		// then ask Chris about the new ES6 way:
		// const searchParams = {...options, '_ep': '/businesses/search'}

		console.log('searchParams', searchParams)

		axios.get('https://circuslabs.net/proxies/yelp-fusion-proxy/', {
			params: searchParams,
			headers: {
				'Authorization': 'Bearer ' + API_KEY
			}
		})
		.then(function (response) {
			console.log('here is the get response data for key:', response.data, response);
			console.log(response.data.businesses)
			displayArticles(response.data.businesses);

		})
		// .catch(function (error) {
		// 	console.warn('axios encountered an error!', error);
		// 	//valueEl.value = 'UNDEFINED'
		// }); 
	}

	return {
		search: searchYelp,
	}
})(); 


//************GOOOOOOOOOOOGLE*************
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



