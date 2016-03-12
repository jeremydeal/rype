(function() {

    'use strict';

    // handles all API calls to the Produce table on the backend
    app.factory('storesService', function ($http) {
        var baseUrl = "../api/store/";
        var $storesService = {};


        // get all products
        $storesService.getStores = function () {
            return $http.get(baseUrl);
        };

        // get one product
        $storesService.getStoreById = function (id) {
            return $http.get(baseUrl + "byId/" + id);
        };

        return $storesService;
    });

})();