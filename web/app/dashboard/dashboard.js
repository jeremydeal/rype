'use strict';

app.controller('dashboardController',
    ['$scope', 'loginService',
        function($scope, loginService) {

            // scope variables for login
            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {}


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            $scope.logout = function(){
                loginService.logout();
            };

            $scope.isLogged = function() {
                loginService.isLogged();
            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }



        }]);