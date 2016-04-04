(function() {

    'use strict';

    app.controller('storeController',
        ['$scope', 'productsService', 'prettyPrintService',
            function ($scope, productsService, prettyPrintService) {

                // STORE GLOBALS
                $scope.storeId = 1;

                // PRODUCT GLOBALS
                $scope.products = {};
                $scope.product = {};
                $scope.productTypes = {};
                $scope.productClasses = {};

                // SORT AND FILTER VARS
                $scope.search = {};
                $scope.search.query = "";
                $scope.search.type = "";
                $scope.search.class = "";
                $scope.search.inSeason = false;

                // DATA INIT
                dataInit();


                ///////////////////////////////////// DATA INIT /////////////////////////////////////////////////////
                function dataInit() {
                    getProducts();
                    getProductById(2);
                    getProductTypes();
                    getProductClasses();
                }


                /////////////////////////////////////// HELPER FUNCTIONS /////////////////////////////////////////////
                // PRETTY PRINT
                $scope.printDate = function (date) {
                    return prettyPrintService.printDate(date);
                };
                $scope.printYesOrNo = function (bit) {
                    return prettyPrintService.printYesOrNo(bit);
                };


                ///////////////////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////
                function getProducts() {
                    productsService.getProducts()
                        .success(function (data) {
                            $scope.products = data.products;
                        })
                }

                function getProductById(id) {
                    productsService.getProductById(id)
                        .success(function (data) {
                            $scope.product = data.product;
                        })
                }

                function getProductTypes() {
                    productsService.getProductTypes()
                        .success(function (data) {
                            $scope.productTypes = data.types;
                        })
                }

                function getProductClasses() {
                    productsService.getProductClasses()
                        .success(function (data) {
                            $scope.productClasses = data.classes;
                        })
                }


                ///////////////////////////////////////////// USER DATA CALLS /////////////////////////////////////////////
                $scope.getProduct = function (id) {
                    getProductById(id);
                };


            }]);

})()