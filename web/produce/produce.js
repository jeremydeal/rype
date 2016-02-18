'use strict';

app.controller('produceController',
    ['$scope', 'produceService',
        function($scope, produceService) {

            // CONTROLLER GLOBALS
            $scope.products = {};
            $scope.product = {};

            // DATA INIT
            dataInit();

            ///////////////////////////////////// DATA INIT /////////////////////////////////////////////
            function dataInit() {
                getProducts();
                getProduct(1);
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
            function getProduct(id) {
                produceService.getProduct(id)
                    .success(function(data) {
                        $scope.product = data.product;
                    })
            }
            //function fixPayDates(timeCards) {
            //    for (var i = 0; i < timeCards.length; i++) {
            //        timeCards[i].payDate = new Date(timeCards[i].payDate);
            //    }
            //}

        }]);
