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


                ///////////////////////////////////// GOOGLE MAPS API ///////////////////////////////////////////////
                var mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(41.7501203,-111.8315048)
                };

                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                $scope.markers = [];

                var infoWindow = new google.maps.InfoWindow();

                var createMarkers = function(storeList) {
                    for (var i = 0; i < storeList.length; i++){
                        createMarker(storeList[i]);
                    }
                };

                var createMarker = function (store){

                    // create marker
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(store.Latitude, store.Longitude),
                        title: store.StoreName
                    });
                    // add StoreId as metedata so we can respond to user click events
                    marker.metadata = { StoreId: store.StoreId };
                    // fill info box that appears when user clicks a marker
                    marker.content = '<h2>' + store.StoreName + '</h2>' +
                        '<div class="infoWindowContent">' +
                        store.Address + " " + store.City + ", " +
                        store.State + " " + store.Zip +
                        '</div>';

                    // make info box appear on user click
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);
                };

                //createMarkers($scope.stores);
                


                ///////////////////////////////////////////// SERVICE CALLS /////////////////////////////////////////
                // STORES
                function getStores() {
                    storesService.getStores()
                        .success(function (data) {
                            $scope.stores = data.stores;
                            createMarkers($scope.stores);
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