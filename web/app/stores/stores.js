(function() {

    'use strict';

    app.controller('storesController',
        ['$scope', 'storesService', 'loginService', 'sessionService',
            function ($scope, storesService, loginService, sessionService) {

                // CONTROLLER GLOBALS
                $scope.stores = {};
                $scope.store = {};

                // SORT AND FILTER VARS
                $scope.search = {};
                $scope.search.query = "";

                // DATA INIT
                dataInit();


                ///////////////////////////////////// DATA INIT /////////////////////////////////////////////////////
                function dataInit() {
                    getStores();
                    getStoreById(2);
                }


                ///////////////////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////
                // STORES
                function getStores() {
                    storesService.getStores()
                        .success(function (data) {
                            $scope.stores = data.stores;
                        })
                }

                function getStoreById(id) {
                    storesService.getStoreById(id)
                        .success(function (data) {
                            $scope.store = data.store;
                        })
                }

                // CURRENT USER
                $scope.isUserLoggedIn = function() {
                    // get promise to check server-side user auth
                    var connected = loginService.checkLoginStatus();

                    // ...check to see if the user has a session registered
                    connected.then(function(response){
                        // if not logged in, redirect to login
                        return !!response.data;
                    });
                };

                $scope.isSelectedStore = function(storeId) {
                    return sessionService.get("UserStore") != storeId;
                };

                $scope.setUserStore = function(storeId) {
                    sessionService.set("UserStore", storeId);
                };


            }]);

})();