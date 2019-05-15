;(function() {
	'use strict';

	angular.module('boilerplate')
		.controller('ListController' ,ListController);

	ListController.$inject = ['$scope'];

	function ListController($scope) {
		$scope.libs = [
			'NodeJS',
			'AngularJS',
			'GulpJS v4.0.2',
			'ESlint',
			'jQuery v3.4',
			'lodash',
			'Bootstrap v4.1',
			'font-awesome v4.7',
			'owl-carousel-2'
		];
	}
})();
