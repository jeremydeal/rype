'use strict';

app.controller('homeController',
    ['$scope', 'sessionService',
        function($scope, sessionService) {

            // scope variables for login
            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                populateUser();
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            // populate user object from JS session
            function populateUser() {
                $scope.user.Username = sessionService.get("Username");
                $scope.user.FirstName = sessionService.get("FirstName");
                $scope.user.LastName = sessionService.get("LastName");
            }


        }]);
