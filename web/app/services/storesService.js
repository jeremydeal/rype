(function() {

    'use strict';

    // handles all API calls to the Produce table on the backend
    app.factory('storesService', function ($http) {
        var baseUrl = "../api/store/";
        var $storesService = {};

        // get all stores
        $storesService.getStores = function () {
            return $http.get(baseUrl);
        };

        // get one store
        $storesService.getStoreById = function (id) {
            return $http.get(baseUrl + "byId/" + id);
        };

        // rate a store
        $storesService.rateStore = function (storeId, rating, userId) {
            var data = {};
            data.StoreId = storeId;
            data.Rating = rating;
            data.CustomerId = userId;

            return $http.post(baseUrl + 'rate/', data);
        };

        return $storesService;
    });

})();