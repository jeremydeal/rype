'use strict';

app.controller('produceController',
    ['$scope', 'produceService',
        function($scope, produceService) {

            // CONTROLLER GLOBALS
            $scope.products = {};
            $scope.product = {};
            $scope.productTypes = {};

            // SORT AND FILTER VARS
            $scope.search = {};
            $scope.search.query = "";
            $scope.search.typeId = "";
            $scope.search.inSeason = false;


            // DATA INIT
            dataInit();

            ///////////////////////////////////// DATA INIT /////////////////////////////////////////////////////
            function dataInit() {
                getProducts();
                $scope.product = products[0];
                getProductsTypes();
            }


            /////////////////////////////////////// HELPER FUNCTIONS /////////////////////////////////////////////
            // PRETTY PRINT
            //$scope.printDate = function(date) {
            //    return prettyPrintService.printDate(date);
            //};
            //$scope.printSchoolYear = function(year) {
            //    return prettyPrintService.printSchoolYear(year);
            //};
            //$scope.printYesOrNo = function(bit) {
            //    return prettyPrintService.printYesOrNo(bit);
            //};
            //$scope.isGreaterThanZero = function(num) {
            //    return prettyPrintService.isGreaterThanZero(num);
            //};


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
            function getProductsTypes() {
                produceService.getProductsTypes()
                    .success(function(data) {
                        $scope.productTypes = data.productTypes;
                    })
            }


            ///////////////////////////////////////////// USER DATA CALLS /////////////////////////////////////////////
            $scope.getProduct = function(id) { getProductById(id); };

            //function fixPayDates(timeCards) {
            //    for (var i = 0; i < timeCards.length; i++) {
            //        timeCards[i].payDate = new Date(timeCards[i].payDate);
            //    }
            //}

        }]);
