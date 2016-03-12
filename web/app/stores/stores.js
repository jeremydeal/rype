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
                var cities = [
                    {
                        city : 'Toronto',
                        desc : 'This is the best city in the world!',
                        lat : 43.7000,
                        long : -79.4000
                    },
                    {
                        city : 'New York',
                        desc : 'This city is aiiiiite!',
                        lat : 40.6700,
                        long : -73.9400
                    },
                    {
                        city : 'Chicago',
                        desc : 'This is the second best city in the world!',
                        lat : 41.8819,
                        long : -87.6278
                    },
                    {
                        city : 'Los Angeles',
                        desc : 'This city is live!',
                        lat : 34.0500,
                        long : -118.2500
                    },
                    {
                        city : 'Las Vegas',
                        desc : 'Sin City...\'nuff said!',
                        lat : 36.0800,
                        long : -115.1522
                    }
                ];

                var mapOptions = {
                    zoom: 12,
                    center: new google.maps.LatLng(41.7419787,-111.8274165)
                };

                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                $scope.markers = [];

                var infoWindow = new google.maps.InfoWindow();

                var createMarker = function (info){

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        title: info.city
                    });
                    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);

                };

                for (var i = 0; i < cities.length; i++){
                    createMarker(cities[i]);
                }

                $scope.openInfoWindow = function(e, selectedMarker){
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };


                ///////////////////////////////////////////// SERVICE CALLS /////////////////////////////////////////
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