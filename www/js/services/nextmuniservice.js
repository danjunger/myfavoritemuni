'use strict';
 
angular.module('mfm.services.nextmuni', [])
  .factory('NextMuni', ['$http',
    function($http) {
      var baseUrl = 'http://proximobus.appspot.com/';
      return {
        getAgencies: function() {
          return $http({method: 'GET', url: baseUrl + 'agencies.json'}).then(function(result) {
            // remove BART from the agency list since it's not native to NextBus API and it's broken with no docs
            result.data.items = result.data.items.filter(function(item) {
              if (item.id === 'bart') {
                return false;
              }
              return true;
            });

            return result.data;
          });
        },
        getStops: function(agency, route, run) {
          return $http({method: 'GET', url: baseUrl + 'agencies/' + agency + '/routes/' + route + '/runs/' + run + '/stops.json'}).then(function(result) {
            return result.data;
          });
        },
        getRuns: function(agency, route) {
          return $http({method: 'GET', url: baseUrl + 'agencies/' + agency + '/routes/' + route + '/runs.json'}).then(function(result) {
            return result.data;
          });
        },
        getRoutes: function(agency) {
          return $http({method: 'GET', url: baseUrl + 'agencies/' + agency + '/routes.json'}).then(function(result) {
            return result.data;
          });
        },
        getPredictions: function(agency, route, stop) {
          return $http({method: 'GET', url: baseUrl + 'agencies/' + agency + '/stops/' + stop + '/predictions/by-route/' + route + '.json'}).then(function(result) {
            return result.data;
          });
        }
      };
    }]);
