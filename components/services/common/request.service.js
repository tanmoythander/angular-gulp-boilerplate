;(function() {
	'use strict';

	angular.module('boilerplate')
		.factory('Request', Request);

	Request.$inject = ['$http', '$q', 'REST'];

	function Request($http, $q, REST) {

		return {
			make: make 
		};

		/**
			* url: 					(required)
			* method: 			(default 'GET')
			*
			* data: 				(optional)
			* cache: 				(optional)
			* contentType: 	(optional)
			*/
		function make(settings) {
			var defer = $q.defer();
			var options = {
				method: settings.method || 'GET',
				cache: settings.cache || false,
				data: settings.data || '',
				isArray: false,
				url: REST.localhost + settings.url,
				headers: {
					'Content-Type': settings.contentType || 'application/json',
					'__XHR__': function() {
            return function(xhr) {
              xhr.upload.addEventListener("progress", function(event) {
                console.log("uploaded " + ((event.loaded/event.total) * 100) + "%");
              });
            };
        	}
				}
			};

			$http(options)
				.then(function(result) {
					console.log('returned');

					if (result.data.state === 'success')
						defer.resolve(result.data.data);
					else
						defer.reject(result.data);
				},
				function(err) {
					console.log('error');
					if (err.status === -1)
						return defer.reject({
							message: 'No connection'
						});
					if (null === err.data)
						return defer.reject({
							message: 'Something went wrong'
						});
					defer.reject(err.data);
				});

			return defer.promise;
		}
	}
})();