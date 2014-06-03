'use strict';

angular.module('mfm.controllers.home', [])
.controller('HomeCtrl', ['$scope', '$stateParams','$ionicSlideBoxDelegate', 'NextMuni', 'WebCache',
	function($scope, $stateParams, $ionicSlideBoxDelegate, NextMuni, WebCache) {

	$scope.favorites = WebCache.getData('favorites') || [];

	if ($stateParams.index) {
		$scope.slideIndex = $stateParams.index;
	}

	var refreshMuniData = function() {
		$scope.favorites.forEach(function(item) {
			NextMuni.getPredictions(item.agency.id, item.route.id, item.stop.id).then(function(data) {
				//this will execute when the AJAX call completes.
				item.predictions = data.items;
			});
		});
	};

	refreshMuniData();
	
	window.setInterval(refreshMuniData, 60000);

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
}]);
