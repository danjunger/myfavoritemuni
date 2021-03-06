'use strict';

angular.module('mfm.controllers.edit', [])
.controller('EditCtrl', ['$scope', '$location', 'WebCache',
  function($scope, $location, WebCache) {
	
	$scope.favorites = WebCache.getData('favorites') || [];

	$scope.data = {
    showDelete: false
  };

	$scope.remove = function(favorite) {
		$scope.favorites = _.without($scope.favorites, favorite);
		WebCache.setData('favorites', $scope.favorites);
	};

	$scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.favorites.splice(fromIndex, 1);
    $scope.favorites.splice(toIndex, 0, item);
    WebCache.setData('favorites', $scope.favorites);
  };

  $scope.navigateTo = function(index) {
    $location.path('/home/' + index);
  }
}]);
