(function () {

	'use strict';

	WeatherCtrl.$inject = ["$rootScope", "$scope", "WeatherSrv", "geolocation", "toastr"];
	angular.module('compucorp.weather')

		.controller('WeatherCtrl', WeatherCtrl);

	function WeatherCtrl($rootScope, $scope, WeatherSrv, geolocation, toastr) {

		$scope.msg = 'Checking weather...';
		$scope.showUserInput = false;
		$scope.showWeatherDetails = false;

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
  		var zipCodeRegex = /^([0-9]+){1},(\s)?([a-zA-Z]+){1}$/;
  		var query = '';

  		if ($scope.userInput.match(cityRegex)) {
  			query = 'q=' + $scope.userInput;
  		}
  		else if ($scope.userInput.match(zipCodeRegex)) {
  			query = 'zip=' + $scope.userInput.replace(' ', '');
  		}
  		else {
  			weatherFailure({ statusText: 'Invalid city name or zip-code format.' });
  		}

  		$scope.msg = 'Checking weather...';
  		return query;
  	}

  	// Request successful
		function weatherSuccess(weather) {
			if (weather.data.cod === '404') {
				weatherFailure({ statusText: weather.data.message });
			}
			prepareData(weather.data);
		}

		// Show error
		function weatherFailure(err) {
			resetTitle();
			toastr.error(err.statusText, 'Error');
			throw err.statusText;
		}

		// Prepare data for view
		function prepareData(data) {
			_.forEach(data.weather, function (weather) {
				weather.icon = iconPrefix(weather.id) + $rootScope.icons.data[weather.id].icon;
			});
			$scope.weather = data;
			$scope.showWeatherDetails = true;
			resetTitle();
		}

		// Get weather icon prefix
		function iconPrefix(code) {
		  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
		    return 'wi-day-';
		  }
		  return 'wi-';
		}

		// Reset top title
		function resetTitle() {
			$scope.msg = $scope.showUserInput ? 'Please enter a city or zip-code followed by the country code (e.g.: 94040, us)' : '';
		}

		init();

	}

})();
