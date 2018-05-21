console.log('Top test')



var YelpModule = (function() {

	const API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';

	const termEl = document.getElementById('term');
	const locationEl = document.getElementById('location');
	const searchBtn = document.getElementById('search');
	const resultsEl = document.getElementById('results');

	var yelpLatLong = [];
	// var yelpMarkerNames = [];

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
		console.log("check this", currentBusiness)
		const title = currentBusiness.name;
		// pick any kind of default fallback image
		let thumbnail = currentBusiness.image_url;
		const currentBusinessLocation = currentBusiness.location;
		const url = currentBusiness.url;

		const liEl = document.createElement('li');
		const imgEl = document.createElement('img');
		const linkEl = document.createElement('a');
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

		liEl.appendChild(imgEl);
		liEl.appendChild(linkEl);
		linkEl.appendChild(pEl);
		liEl.appendChild(pAddressEl);
		liEl.appendChild(p$El);
		liEl.appendChild(pRatingEl);

		resultsEl.appendChild(liEl);

		yelpLatLong.push({
			lat: currentBusiness.coordinates.latitude, 
			lng: currentBusiness.coordinates.longitude
		});

		// yelpMarkerNames.push({

		// });

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
			// send it over to google
			createMarkers(yelpLatLong)
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

	// function posting() {
	
	// 	// make a GET request
	// 	// axios.get("file:///Users/natalyg/Documents/Classes/3rd Quarter/AJAX/YelpMaps/index.html")
	// 		var key = 'cat'
	// 	 	//we are changing get to post - this is making the call. Once the call is made we move to '.then'
	// 	 	axios.post("http://localhost:3000/", yelpLatLong)
	// 	 	//.then is part of the promise api that js is using to talk to the browser
	// 	 	//we are passing a function in it with a given parameter
	// 	 	.then(function(response){
	// 	 		//we add the .data bc it is a list in the value that you get when you look for response in the console. You can call all the things in that list to get the info listed for you directly in the console. 
	// 	 		console.log('here is the response data for key', response);
	// 	 	})
	// 	 	//this catch is recommended to have (not neccessary). It catches all in case there's an issue. It lets us tell the user to do something Like try again in five seconds or refresh
	// 	 	.catch(function(error) {
	// 	 		console.warn('.axios encountered an error!', error)
	// 	 	});

	// }

	// posting();


	return {
		search: searchYelp
	}

})(); 


