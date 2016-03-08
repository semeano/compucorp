(function () {

	'use strict';

	angular.module('compucorp.weather')

		.controller('WeatherCtrl', WeatherCtrl);

	function WeatherCtrl($scope, WeatherSrv, geolocation, toastr) {

		$scope.msg = 'Checking weather...';
		$scope.showUserInput = false;

		this.weatherFromInput = weatherFromInput;

		function init() {
			geolocation.getLocation()
				.then(weatherFromLatLon, requestWeatherFromInput);
		}

		///

		// Get weather data from browser geolocation API
		function weatherFromLatLon(data) {
			WeatherSrv.get('lat=' + data.coords.latitude + '&lon=' + data.coords.longitude)
				.then(weatherSuccess, weatherFailure);
  	}

  	// Get weather data from user input
  	function requestWeatherFromInput() {
  		$scope.msg = 'Please enter a city or zip-code followed by the country code (e.g.: 94040, us)';
  		$scope.showUserInput = true;
  	}

  	// Request data from user input
  	function weatherFromInput() {
  		WeatherSrv.get(parseUserInput())
				.then(weatherSuccess, weatherFailure);
  	}

  	// Parse user input
  	function parseUserInput() {
  		var cityRegex = /^([a-zA-Z\s]+){1}$/;
  		var zipCodeRegex = /^([0-9-]+){1},(\s)?([a-zA-Z]+){1}$/;

  		if ($scope.userInput.match(cityRegex)) {
  			return 'q=' + $scope.userInput;
  		}
  		else if ($scope.userInput.match(zipCodeRegex)) {
  			return 'zip=' + $scope.userInput;
  		}
  		else {
  			weatherFailure({ statusText: 'Invalid city name or zip-code format.' });
  		}
  	}

  	// Request successful
		function weatherSuccess(weather) {
			if (weather.data.cod === '404') {
				weatherFailure({ statusText: weather.data.message });
			}
			prettyData($scope.msg = weather);
		}

		// Show error
		function weatherFailure(err) {
			toastr.error(err.statusText, 'Error');
			throw err.statusText;
		}

		// Show data in a way that can be readable
		function prettyData(data) {

		}

		init();

	}

})();
