(function () {

	'use strict';

  MainModule.$inject = ["cfpLoadingBarProvider"];
	angular.module('compucorp.main', [])

		.config(MainModule);


	function MainModule(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
