'use strict';

angular.module('mfm.controllers.edit', [])
  .controller('EditCtrl', ['$scope', 'WebCache',
  function($scope, WebCache) {
	
	$scope.favorites = WebCache.getData('favorites') || [];

	$scope.remove = function(favorite) {
		$scope.favorites = _.without($scope.favorites, favorite);
		WebCache.setData('favorites', $scope.favorites);
	};
  }]);
