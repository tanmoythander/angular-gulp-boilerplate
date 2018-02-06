;(function() {

	'use strict';

	angular.module('boilerplate')
		.directive('boilerplateCarousel', boilerplateCarousel);

	function boilerplateCarousel () {

		// Definition of directive
		var directiveDefinitionObject = {
			restrict: 'E',
			templateUrl: 'components/directives/carousel.html'
		};

		return directiveDefinitionObject;
	}

})();
