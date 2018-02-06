;(function() {

	'use strict';

	angular.module('boilerplate')
		.factory('Query', [
			'$http', '$q', 'CONSTANTS', '$localStorage', Query
		]);

	//////////////// factory

	function Query($http, $q, CONSTANTS, $localStorage) {

		var service = {
			make: make
		};

		return service;

		//////////////// definition

		function make(request) {

			var deferred = $q.defer();
			var token = undefined;
			if (request.addToken) token = $localStorage.token || undefined;

			$http({
				async: true,
				crossDomain: true,
				url: CONSTANTS.API_URL + request.url,
				method: request.method,
				params: request.params,
				data: request.data,
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
					'x-access-key': token
				}
			}).then(function(data) {
				if (!data.config) {
					console.log('Server error occured.');
				}
				deferred.resolve(data.data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}
	}
})();
