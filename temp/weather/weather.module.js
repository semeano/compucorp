(function () {

	'use strict';

   WeatherModule.$inject = ["$stateProvider", "$urlRouterProvider"];
	angular.module('compucorp.weather', [])

		.config(WeatherModule);


	function WeatherModule($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('weather', {
	      url: '/',
	      templateUrl: 'weather/weather.html',
	      controller: 'WeatherCtrl as weatherCtrl'
	    });

	  $urlRouterProvider.otherwise('/');

   }

})();
