'use strict';

app.controller('produceController',
    ['$scope', 'produceService',
        function($scope, produceService) {

            // CONTROLLER GLOBALS
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
            $scope.printDate = function(date) {
                return prettyPrintService.printDate(date);
            };
            $scope.printYesOrNo = function(bit) {
                return prettyPrintService.printYesOrNo(bit);
            };


            ///////////////////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////
            function getProducts() {
                produceService.getProducts()
                    .success(function(data) {
                        $scope.products = data.products;
                    })
            }
            function getProductById(id) {
                produceService.getProductById(id)
                    .success(function(data) {
                        $scope.product = data.product;
                    })
            }
            function getProductTypes() {
                produceService.getProductTypes()
                    .success(function(data) {
                        $scope.productTypes = data.types;
                    })
            }
            function getProductClasses() {
                produceService.getProductClasses()
                    .success(function(data) {
                        $scope.productClasses = data.classes;
                    })
            }


            ///////////////////////////////////////////// USER DATA CALLS /////////////////////////////////////////////
            $scope.getProduct = function(id) { getProductById(id); };


        }]);
