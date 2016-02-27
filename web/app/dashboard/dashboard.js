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
            $scope.logout=function(){
                loginService.logout();
            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }



        }]);