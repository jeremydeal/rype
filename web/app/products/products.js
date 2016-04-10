(function() {

    'use strict';

    app.controller('productsController',
        ['$scope', 'productsService', 'loginService', 'prettyPrintService',
            function ($scope, productsService, loginService, prettyPrintService) {

                // PRODUCTS GLOBALS
                $scope.products = {};
                $scope.product = {};
                $scope.productTypes = {};
                $scope.productClasses = {};

                // USER GLOBALS
                $scope.user = {};
                $scope.shoppingListIds = [];

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

                    // get current user and user's shopping list
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

                $scope.addToShoppingList = function(produceId) {
                    productsService.addToShoppingList($scope.user.CustomerId, produceId)
                        .success(function(response) {
                            populateShoppingList();
                        })
                };

                $scope.removeFromShoppingList = function(produceId) {
                    productsService.removeFromShoppingList($scope.user.CustomerId, produceId)
                        .success(function(response) {
                            populateShoppingList();
                        })
                };

                // CURRENT USER
                // populate user object from JS session
                function populateUser() {
                    // check if user is logged in server side...
                    loginService.checkLoginStatus()
                        .then(function(response){
                            // if logged in, populate user from sessionStorage
                            if (!!response.data) {
                                $scope.user = sessionService.getUser();
                                populateShoppingList();
                            }
                        });
                }

                function populateShoppingList() {
                    productsService.getProductsByShoppingList($scope.user.CustomerId)
                        .success(function (data) {
                            $scope.shoppingListIds = [];
                            var products = data.products;
                            angular.forEach(products, function(obj) {
                                $scope.shoppingListIds.push(obj.ProduceId);
                            });
                        })
                }




                ///////////////////////////////////////////// USER DATA CALLS /////////////////////////////////////////////
                $scope.getProduct = function (id) {
                    getProductById(id);
                };


            }]);

})()