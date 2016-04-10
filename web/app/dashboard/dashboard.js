(function() {

    'use strict';

    app.controller('dashboardController',
        ['$scope', 'loginService', 'sessionService', 'productsService',
            function ($scope, loginService, sessionService, productsService) {

                // scope vars
                $scope.user = {};
                $scope.products = {};

                dataInit();


                /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
                function dataInit() {
                    populateUser();
                }


                /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
                // populate user object from JS session
                function populateUser() {
                    // check if user is logged in server side...
                    loginService.checkLoginStatus()
                        .then(function(response) {
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
                            $scope.products = data.products;
                        })
                }

                $scope.logout = function () {
                    loginService.logout();
                };


                /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////


            }]);

})();

