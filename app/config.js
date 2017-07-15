;(function() {

	'use strict';

	angular.module('boilerplate', [
		'ui.router'
	])
	.config(config);

	// safe dependency injection
	// this prevents minification issues
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');

		$urlRouterProvider.when('/user', '/home');

		$stateProvider

			.state('404', {
				url: '/404',
				template: '<h1>404 Not Found</h1>'
			})

			.state('home', {
				url: '/home',
				templateUrl: 'views/partial-home.html'
			})
				.state('home.list', {
					url: '/list',
					templateUrl: 'views/partial-home-list.html',
					controller: 'ListController'
				})

				// nested list with just some random string data
				.state('home.paragraph', {
					url: '/paragraph',
					template: '<p>I could sure use a drink right now. Are you in?</p>'
				})

			// ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
			.state('about', {
				url: '/about',
				views: {
					'': {
						templateUrl: 'views/partial-about.html'
					},
					'columnOne@about': {
						template: '<p>Look I am a column!</p>'
					},
					'columnTwo@about': { 
						templateUrl: 'views/table-data.html',
						controller: 'ScotchController'
					}
				}
			});
	}



	/**
	 * Run block
	 * Runs first after launching
	 */
	angular.module('boilerplate')
		.run(run);

	run.$inject = ['$rootScope', '$state', 'LocalStorage'];

	function run($rootScope, $state, LocalStorage) {


	}

	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
	angular.module('boilerplate')
		.constant('CONSTANTS', {
			'API_URL': 'http://localhost:3256/XXXX'
		});

})();
