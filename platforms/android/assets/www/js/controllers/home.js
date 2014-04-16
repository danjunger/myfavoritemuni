'use strict';

angular.module('mfm.controllers.home', [])
.controller('HomeCtrl', ['$scope', '$ionicSlideBoxDelegate', 'NextMuni', 'WebCache',
	function($scope, $ionicSlideBoxDelegate, NextMuni, WebCache) {

	$scope.favorites = WebCache.getData('favorites') || [];

	$scope.favorites.forEach(function(item) {
		NextMuni.getPredictions(item.agency.id, item.route.id, item.stop.id).then(function(data) {
			//this will execute when the AJAX call completes.
	        item.predictions = data.items;
	    });
	});

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
}]);
