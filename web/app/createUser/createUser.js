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
                usersService.createUser($scope.user)
                    .success(function(response) {
                        if (response.data) {
                            loginService.login(response.data)
                        }
                    })
            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
            }


        }]);