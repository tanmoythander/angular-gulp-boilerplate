;(function() {
	'use strict';

	angular.module('boilerplate')
		.factory('CommonValidation', CommonValidation);

	CommonValidation.$inject = [];

	function CommonValidation() {
		var signup = {
			/* eslint-disable max-len */
			email: {
				required: true,
				pattern: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
			},
			/* eslint-enable */
			password: {
				required: true,
				minlength: 8,
				maxlength: 100
			},
			name: {
				required: true,
				minlength: 3,
				maxlength: 100
			}
		};

		var login = {
			/* eslint-disable max-len */
			email: {
				required: true,
				pattern: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
			},
			/* eslint-enable */
			password: {
				required: true,
				minlength: 8,
				maxlength: 100
			}
		};

		return {
			signup: signup,
			login: login
		};
	}
})();
