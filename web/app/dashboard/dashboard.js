'use strict';

app.controller('dashboardController',
    ['$scope', '$location', 'usersService',
        function($scope, $location, usersService) {

            // scope variables for login
            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                $scope.user = $rootScope.user;
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            function logout() {
                usersService.logout();
                clearUserInfo();
                $location.path("/login");        // TODO: test
            }


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.isLoggedIn = function() { getUser() };
            $scope.logout = function() { logout() };

        }]);