(function () {

	'use strict';

	angular.module('compucorp.data')

		.constant('API', 'http://api.openweathermap.org/data/2.5/weather?')
		.constant('APP_ID', '6da42917120e3a188b8f0a6efed30502')

		.factory('WeatherSrv', WeatherSrv);


	function WeatherSrv($http, API, APP_ID) {

		var service =  { get: get };

		///

		// Get project
		function get(query) {
			return $http({ method: 'GET', url: API + 'appid=' + APP_ID + '&' + query });
		}

		return service;

	}

})();
