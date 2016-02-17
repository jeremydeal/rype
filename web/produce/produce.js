'use strict';

app.controller('produceController',
    ['$scope',
        function($scope) {

            // CONTROLLER GLOBALS
            $scope.products = {};

            // DATA INIT
            dataInit();

            ///////////////////////////////////// DATA INIT /////////////////////////////////////////////
            function dataInit() {
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
            //function getTimeCards(year, userId) {
            //    timeCardsService.getTimeCardsAndPaymentsByYearAndUser(year, userId)
            //        .success(function(data) {
            //            $scope.timeCards = data.timeCards;
            //            helperService.fixAllBeginAndEndDates($scope.timeCards);
            //            fixPayDates($scope.timeCards);
            //        })
            //}
            //function fixPayDates(timeCards) {
            //    for (var i = 0; i < timeCards.length; i++) {
            //        timeCards[i].payDate = new Date(timeCards[i].payDate);
            //    }
            //}

        }]);
