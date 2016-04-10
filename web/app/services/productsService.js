(function() {

    'use strict';

// handles all API calls to the Produce table on the backend
    app.factory('productsService', function ($http) {
        var baseUrl = "../api/produce/";
        var produceTypesUrl = "../api/produceType/";
        var produceClassesUrl = "../api/produceClass/";
        var productsService = {};


        // get all products
        productsService.getProducts = function () {
            return $http.get(baseUrl);
        };

        // get one product
        productsService.getProductById = function (id) {
            return $http.get(baseUrl + "byId/" + id);
        };

        // get products by type
        productsService.getProductsByType = function (typeId) {
            return $http.get(baseUrl + "byType/" + typeId);
        };

        // get products by store (including ratings for those products at that store)
        productsService.getProductsByStore = function (storeId) {
            return $http.get(baseUrl + "byStore/" + storeId);
        };


        //////////////////////////////////// SHOPPING LIST /////////////////////////////////////
        // get products by store (including ratings for those products at that store)
        productsService.getProductsByShoppingList = function (customerId) {
            return $http.get(baseUrl + "getShoppingList/" + customerId);
        };

        productsService.addToShoppingList = function(customerId, produceId) {
            return $http.get(baseUrl + "addToShoppingList/" + customerId + "/" + produceId);
        };

        productsService.removeFromShoppingList = function(customerId, produceId) {
            return $http.get(baseUrl + "removeFromShoppingList/" + customerId + "/" + produceId);
        };


        //////////////////////////////////// SUPPLEMENTARY //////////////////////////////////////
        // get product types
        productsService.getProductTypes = function () {
            return $http.get(produceTypesUrl);
        };

        // get product classes
        productsService.getProductClasses = function () {
            return $http.get(produceClassesUrl);
        };


        return productsService;
    });

})();