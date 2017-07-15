;(function() {
	'use strict';

	angular.module('boilerplate')
		.controller('ListController' ,ListController);

	ListController.$inject = ['$scope'];

	function ListController($scope) {
		$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
	}
})();
