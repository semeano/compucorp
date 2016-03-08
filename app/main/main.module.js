(function () {

	'use strict';

	angular.module('compucorp.main', [])

		.config(MainModule);


	function MainModule(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
