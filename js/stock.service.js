var coreApp = angular.module('StockService', []);
coreApp.controller('CoreController', ['$scope', function ($scope) {
	$scope.exchanges = [];
	$scope.update = function (data) {
		$scope.exchanges = data.data;
	};
}]);