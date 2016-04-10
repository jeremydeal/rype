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

                ///////////////////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////
                function getProducts(storeId) {
                    productsService.getProductsByStore(storeId)
                        .success(function (data) {
                            $scope.products = data.products;

                            // replace blank Rating fields with 0 so orderBy will work
                            angular.forEach($scope.products, function(obj) {
                                if (!obj.Rating) {
                                    obj.Rating = 0;
                                }
                            });
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

                $scope.isUserPreferredStore = function(storeId) {
                    return sessionService.get("PreferredStore") == storeId;
                };

                $scope.setUserPreferredStore = function(storeId) {
                    console.log(Object.size($scope.user));
                    console.log("storeId: " + storeId);
                    console.log("user object: " + $scope.user);

                    if (Object.size($scope.user) > 0) {
                        $scope.user.PreferredStore = storeId;
                        loginService.setPreferredStore($scope.user)
                            .success(function(response) {
                                sessionService.set("PreferredStore", storeId);
                                console.log("API call succeeded");
                            });
                    }
                };


                // STORES
                function getStore(storeId) {
                    storesService.getStoreById(storeId)
                        .success(function (data) {
                            $scope.store = data.store;
                            getProducts($scope.store.StoreId);
                            populateHistoricalRatings();
                        })
                }

                function populateHistoricalRatings() {
                    // get today's date and strip the time off
                    var date = new Date();
                    date.setHours(0,0,0,0);
                    var HOUR = 60 * 60 * 1000;      // ms
                    date = new Date(date.getTime() - (HOUR * 6));

                    // add dates as X values, ratings as Y values,
                    // decrementing the date as we move back in time
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.Rating)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus1)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus2)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus3)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus4)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus5)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus6)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus7)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus8)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus9)]);

                    date.setDate(date.getDate() - 1);
                    $scope.historicalRatings.push(
                        [date.getTime(), parseFloat($scope.store.RatingTMinus10)]);
                }

                $scope.rateProduce = function(storeId, produceId, myRating) {
                    if (!!$scope.user.CustomerId && !!storeId && !!produceId && !!myRating) {
                        var customerId = $scope.user.CustomerId;

                        storesService.rateProduce(storeId, produceId, customerId, myRating)
                            .then(function(response) {
                                // DID IT WORK
                                if (!!response.data) {
                                    console.log("Rating $POST worked.");
                                }
                                else {
                                    console.log("Rating $POST did not work.");
                                }
                            });

                        console.log("storeID: " + storeId + ", produceId: " + produceId + ", customerId: " + customerId + ", myRating: " + myRating);
                    }
                    else {
                        console.log("storeID: " + storeId + ", produceId: " + produceId + ", customerId: DAMN IT! LOG IN!, myRating: " + myRating);
                    }
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
                            day: '%b %e'
                        }
                    },
                    yAxis: {
                        max: 5.0,
                        min: 1.0
                    },
                    series: [{
                        data: $scope.historicalRatings,
                        showInLegend: false
                    }],
                    title: {
                        text: '10-Day Ratings Trend'
                    },
                    loading: false
                }


            }]);
})();