// handles all API calls to the Produce table on the backend
app.factory('produceService', function($http) {
    var baseUrl = "../api/produce/";
    var produceTypesUrl = "../api/produceType/";
    var produceService = {};

    // get all products
    produceService.getProducts = function() {
        return $http.get(baseUrl);
    };

    // get one product
    produceService.getProductById = function(id) {
        return $http.get(baseUrl + "byId/" + id);
    };

    // get products by type
    produceService.getProductsByType = function(typeId) {
        return $http.get(baseUrl + "byType/" + typeId);
    };

    // get product types
    produceService.getProductTypes = function() {
        return $http.get(produceTypesUrl);
    };

    return produceService;
});