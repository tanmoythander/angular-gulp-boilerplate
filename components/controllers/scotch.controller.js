;(function() {
	'use strict';

	angular.module('boilerplate')
		.controller('ScotchController' ,ScotchController);

	ScotchController.$inject = ['$scope'];

	function ScotchController($scope) {

		$scope.message = 'test';

		$scope.scotches = [
			{
				name: 'Macallan 12',
				price: 50
			},
			{
				name: 'Chivas Regal Royal Salute',
				price: 10000
			},
			{
				name: 'Glenfiddich 1937',
				price: 20000
			}
		];
	}
})();
