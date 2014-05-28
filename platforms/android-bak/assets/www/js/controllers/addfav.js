'use strict';

angular.module('mfm.controllers.addfav', [])
  .controller('AddFavCtrl', ['$scope', '$location', 'NextMuni', 'WebCache',
  function($scope, $location, NextMuni, WebCache) {
	
	$scope.user = {
		agency: '',
		route: '',
		direction: '',
		stop: '',
		favorites: WebCache.getData('favorites') || []
	};

	// populate the list of agencies on page load
	NextMuni.getAgencies().then(function(data) {
       //this will execute when the AJAX call completes.
       $scope.agencies = data.items;
    });

	// watch for changes to the agency, fetch routes on change
	$scope.$watch('user.agency', function(newVal) {
		$scope.user.route = '';
		$scope.user.stop = '';
		$scope.user.direction = '';
		$scope.predictions = [];
		$scope.routes = undefined;
		$scope.directions = undefined;
		$scope.stops = undefined;
		
		if (newVal !== null && newVal !== '') {
			NextMuni.getRoutes(newVal.id).then(function(data) {
				//this will execute when the AJAX call completes.
				$scope.routes = data.items;
			});
		}
	});

	// watch for changes to the route, fetch directions on change
	$scope.$watch('user.route', function(newVal) {
		$scope.user.stop = '';
		$scope.user.direction = '';
		$scope.predictions = [];
		$scope.directions = undefined;
		$scope.stops = undefined;

		if (newVal !== null && newVal !== '') {
			NextMuni.getRuns($scope.user.agency.id, $scope.user.route.id).then(function(data) {
				//this will execute when the AJAX call completes.
				$scope.directions = data.items;
            });
        }
	});

	// watch for changes to the direction, fetch stops on change
	$scope.$watch('user.direction', function(newVal) {
		$scope.user.stop = '';
		$scope.predictions = [];
		$scope.stops = undefined;

		if (newVal !== null && newVal !== '') {
			NextMuni.getStops($scope.user.agency.id, $scope.user.route.id, newVal.id).then(function(data) {
				//this will execute when the AJAX call completes.
				$scope.stops = data.items;
			});
		}
    });

	$scope.saveFavorite = function() {
		var newFav = {
			agency: $scope.user.agency,
			route: $scope.user.route,
			direction: $scope.user.direction,
			stop: $scope.user.stop
		};
		
		// save to local cache
		$scope.user.favorites.push(newFav);
		WebCache.setData('favorites', $scope.user.favorites);

		// redirect back to edit
		$location.path('/edit');
	};
}]);
