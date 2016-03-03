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
                loginService.createUser($scope.user, $scope)
                    .then(function(response) {

                        // if user creation is successful, log in!
                        if (!!response.data.user) {
                            loginService.login(response.data.user, $scope);
                        }
                    }
                )

            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            $scope.clearUserInfo = function() {
                $scope.user = {};
            };


        }]);