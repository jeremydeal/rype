(function() {

    'use strict';

    app.controller('storesController',
        ['$scope', 'storesService',
            function ($scope, storesService) {

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



            }]);

})();