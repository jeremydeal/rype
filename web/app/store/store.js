(function() {

    'use strict';

    app.controller('storeController',
        ['$scope', 'productsService', 'storesService', 'loginService', 'sessionService', 'prettyPrintService', '$routeParams',
            function ($scope, productsService, storesService, loginService, sessionService, prettyPrintService, $routeParams) {

                // STORE GLOBALS
                $scope.storeId = $routeParams.storeId;
                $scope.store = {};
                $scope.historicalRatings = [];

                // USER GLOBALS
                $scope.user = {};

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

                    getStore($scope.storeId);

                    populateUser();
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

                // CURRENT USER
                // populate user object from JS session
                function populateUser() {
                    // check if user is logged in server side...
                    loginService.checkLoginStatus()
                        .then(function(response){
                            // if logged in, populate user from sessionStorage
                            if (!!response.data) {
                                $scope.user = sessionService.getUser();
                            }
                        });
                }

                // STORES
                function getStore(storeId) {
                    storesService.getStoreById(storeId)
                        .success(function (data) {
                            $scope.store = data.store;
                            populateHistoricalRatings();
                        })
                }

                function populateHistoricalRatings() {
                    var date = new Date();
                    $scope.historicalRatings.push(
                        [date, parseFloat($scope.store.Rating)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 1), parseFloat($scope.store.RatingTMinus1)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 2), parseFloat($scope.store.RatingTMinus2)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 3), parseFloat($scope.store.RatingTMinus3)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 4), parseFloat($scope.store.RatingTMinus4)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 5), parseFloat($scope.store.RatingTMinus5)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 6), parseFloat($scope.store.RatingTMinus6)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 7), parseFloat($scope.store.RatingTMinus7)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 8), parseFloat($scope.store.RatingTMinus8)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 9), parseFloat($scope.store.RatingTMinus9)]);
                    $scope.historicalRatings.push(
                        [new Date(date.getDate() - 10), parseFloat($scope.store.RatingTMinus10)]);
                }


                ///////////////////////////////////////////// USER DATA CALLS /////////////////////////////////////////////
                $scope.getProduct = function (id) {
                    getProductById(id);
                };


                ///////////////////////////////////////////// HIGH CHARTS /////////////////////////////////////////////////
                $scope.chartConfig = {
                    options: {
                        chart: {
                            type: 'line'
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%d/%m'
                        }
                    },
                    series: [{
                        data: $scope.historicalRatings
                    }],
                    title: {
                        text: '10-Day Ratings Trend'
                    },
                    loading: false
                }


            }]);
})();