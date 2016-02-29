'use strict';

app.controller('createUserController',
    ['$scope', '$location', 'loginService',
        function($scope, $location, loginService) {

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