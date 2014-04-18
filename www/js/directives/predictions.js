angular.module('mfm.directives.barGraph', []).
  directive('predictionset', [function() {
      return {
        restrict: 'E',
        templateUrl: '../../templates/predictionset.html'
      };
    }]);