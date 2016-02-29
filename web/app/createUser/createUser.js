'use strict';

app.controller('createUserController',
    ['$scope', '$location', 'usersService', 'loginService',
        function($scope, $location, usersService, loginService) {

            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {

            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            $scope.createUser = function() {
                loginService.createUser($scope.user, $scope);
            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }


        }]);