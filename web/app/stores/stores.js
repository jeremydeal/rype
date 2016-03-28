(function() {

    'use strict';

    //Hopefully a fix for collapsing navigation bar once an item has been tapped. 
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });


    app.controller('storesController',
        ['$scope', 'storesService', 'loginService', 'sessionService', 'prettyPrintService',
            function ($scope, storesService, loginService, sessionService, prettyPrintService) {

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




                ///////////////////////////////////////////// SERVICE CALLS /////////////////////////////////////////
                // STORES
                function getStores() {
                    storesService.getStores()
                        .success(function (data) {
                            $scope.stores = data.stores;
                            createMarkers($scope.stores);
                        })
                }

                $scope.rateStore = function(storeId, myRating) {
                    if (!!$scope.user.CustomerId && !!storeId && !!myRating) {
                        var customerId = $scope.user.CustomerId;

                        storesService.rateStore(storeId, myRating, customerId)
                            .then(function(response) {
                                // DID IT WORK
                                if (!!response.data) {
                                    console.log("Rating $POST worked.");
                                }
                                else {
                                    console.log("Rating $POST did not work.");
                                }
                            });

                        console.log("storeID: " + storeId + ", myRating: " + myRating + ", customerId: " + customerId);
                    }
                    else {
                        console.log("storeID: " + storeId + ", myRating: " + myRating + ", customerId: DAMN IT! I SAID YOU HAVE TO LOG IN!");
                    }
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
                            }
                        });
                }

                //$scope.isUserLoggedIn = function() {
                //    sessionService.userExists();
                //};

                $scope.isUserPreferredStore = function(storeId) {
                    return sessionService.get("PreferredStore") == storeId;
                };

                $scope.setUserPreferredStore = function(storeId) {
                    console.log(Object.size($scope.user));

                    if (Object.size($scope.user) > 0) {
                        sessionService.set("PreferredStore", storeId);
                    }
                };

                $scope.roundToTenth = function(num) {
                    return prettyPrintService.roundToTenth(num);
                };


                ///////////////////////////////////// GOOGLE MAPS API ///////////////////////////////////////////////

                //http://stackoverflow.com/questions/18444161/google-maps-responsive-resize
                // google.maps.event.addDomListener(window, 'load', initialize);
                //google.maps.event.addDomListener(window, "resize", function() {
                //    var center = map.getCenter();
                //    google.maps.event.trigger(map, "resize");
                //    map.setCenter(center);
                //});


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
                    // add StoreId as metadata so we can respond to user click events
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


            }]);

})();