(function () {

	'use strict';

	var dependencies = [

			// Angular
			'ngAnimate',

			// Vendor
			'ui.router',
			'angular-loading-bar',
			'geolocation',
			'toastr',

			// Modules
			'compucorp.data',
			'compucorp.main',
			'compucorp.weather'
		];

	angular.module('compucorp', dependencies);

})();
