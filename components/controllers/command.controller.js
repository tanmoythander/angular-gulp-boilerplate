;(function() {
	'use strict';

	angular.module('boilerplate')
		.controller('CommandController' ,CommandController);

	CommandController.$inject = ['$scope'];

	function CommandController($scope) {

		$scope.message = 'test';

		$scope.commands = [
			{
				command: 'gulp',
				details: 'Serves the source code. Helpful for development. Watches for file change and synchronizes with browser to show the difference'
			},
			{
				command: 'gulp build',
				details: 'Builds the source and puts it into ./_build directory. Cleans the previous build. Helpful for deployment'
			},
			{
				command: 'gulp clean:build',
				details: 'Cleans the build'
			},
			{
				command: 'gulp server',
				details: 'Serves the source code. No watcher'
			},
			{
				command: 'gulp server-build',
				details: 'Serves the build. Helps to test the build before deployment'
			}
		];
	}
})();
