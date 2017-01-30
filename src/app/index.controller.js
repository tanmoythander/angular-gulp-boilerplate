(function () {
	'use strict';
	angular.module('charter', ['chart.js'])
		.controller('IndexCtrl', IndexCtrl);

	IndexCtrl.$inject = ['$scope'];

	function IndexCtrl($scope) {
		var vm = this;
		//vm.name = 'Tanmoy Thander';

		vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
		vm.series = ['Series A', 'Series B'];
		vm.data = [
			[65, 59, 80, 114, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		vm.onClick = function (points, evt) {
			console.log(points, evt);
		};
		vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
		vm.options = {
			scales: {
				yAxes: [
					{
						id: 'y-axis-1',
						type: 'linear',
						display: true,
						position: 'left'
					}
				]
			}
		};
	}
})();
