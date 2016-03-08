(function () {

	'use strict';

	angular.module('compucorp.data')

		.constant('API', { url: 'http://api.openweathermap.org/data/2.5/weather?',
											 appid: '6da42917120e3a188b8f0a6efed30502',
											 options: '&units=metric' })

		.run(function ($rootScope, $http) {
			$http({ method: 'GET', url: 'icons.json' })
				.then(function (data) {
					$rootScope.icons = data;
				});
		})

		.factory('WeatherSrv', WeatherSrv);


	function WeatherSrv($http, API) {

		var service =  { get: get };

		///

		// Get project
		function get(query) {
			return $http({ method: 'GET', url: API.url + 'appid=' + API.appid + '&' + query + API.options });
		}

		return service;

	}

})();
