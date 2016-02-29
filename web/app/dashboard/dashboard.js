'use strict';

app.controller('dashboardController',
    ['$scope', 'loginService', 'sessionService',
        function($scope, loginService, sessionService) {

            // scope variables for login
            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                populateUser();
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            $scope.logout = function(){
                loginService.logout();
            };

            $scope.isLogged = function() {
                loginService.isLogged();
            };

            // populate user object from JS session
            function populateUser() {
                $scope.user.Username = sessionService.get("Username");
                $scope.user.FirstName = sessionService.get("FirstName");
                $scope.user.LastName = sessionService.get("LastName");
            }


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }



        }]);