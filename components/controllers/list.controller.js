;(function() {
	'use strict';

	angular.module('boilerplate')
		.controller('ListController' ,ListController);

	ListController.$inject = ['$scope'];

	function ListController($scope) {
		$scope.libs = [
			'NodeJS',
			'AngularJS',
			'GulpJS',
			'ESlint',
			'jQuery',
			'lodash',
			'Bootstrap 4.1',
			'font-awesome',
			'owl-carousel-2'
		];
	}
})();
