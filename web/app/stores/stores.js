(function() {

    'use strict';

    app.controller('storesController',
        ['$scope', 'storesService', 'loginService', 'sessionService',
            function ($scope, storesService, loginService, sessionService) {

                // CONTROLLER GLOBALS
                $scope.stores = {};
                $scope.store = {};
                $scope.user = {};

                // SORT AND FILTER VARS
                $scope.search = {};
                $scope.search.query = "";

                // DATA INIT
                dataInit();


                ///////////////////////////////////// DATA INIT /////////////////////////////////////////////////////
                function dataInit() {
                    getStores();
                    populateUser();
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

                    var curStore = store;

                    // create marker
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(curStore.Latitude, curStore.Longitude),
                        title: curStore.StoreName
                    });
                    // add StoreId as metedata so we can respond to user click events
                    marker.metadata = { obj: curStore };
                    // fill info box that appears when user clicks a marker
                    marker.content = '<div class="infoWindowContent">' +
                        curStore.Address + " " + curStore.City + ", " +
                        curStore.State + " " + curStore.Zip +
                        '</div>';

                    // make info box appear on user click
                    google.maps.event.addListener(marker, 'click', function() {
                        $scope.openInfoWindow(null, marker);
                        $scope.$digest();
                    });

                    $scope.markers.push(marker);
                };

                // onClick() event handler for user selecting a store within the map
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e && e.preventDefault();

                    infoWindow.setContent('<h2>' + selectedMarker.title + '</h2>' + selectedMarker.content);
                    infoWindow.open($scope.map, selectedMarker);

                    $scope.store = selectedMarker.metadata.obj;
                };


                ///////////////////////////////////////////// SERVICE CALLS /////////////////////////////////////////
                // STORES
                function getStores() {
                    storesService.getStores()
                        .success(function (data) {
                            $scope.stores = data.stores;
                            createMarkers($scope.stores);
                        })
                }

                //function getStoreById(id) {
                //    storesService.getStoreById(id)
                //        .success(function (data) {
                //            $scope.store = data.store;
                //        })
                //}

                // CURRENT USER
                // populate user object from JS session
                function populateUser() {
                    $scope.user = sessionService.getUser();
                }

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