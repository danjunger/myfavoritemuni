'use strict';

angular.module('mfm.services.cache', [])
  .factory('WebCache', ['storageService',
    function (storageService) {
        return {
            getData: function (key) {
                return storageService.get(key);
            },

            setData: function (key,data) {
                storageService.save(key, data);
            },
            
            removeData: function (key) {
                storageService.remove(key);
            },
            clearAll: function() {
                storageService.clearAll();
            }
        };
    }
]);