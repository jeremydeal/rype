'use strict';

app.controller('loginController',
    ['$scope', 'loginService',
        function($scope, loginService) {

            $scope.email = "";
            $scope.password = "";




            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            function login() {
                var data = {
                    "email": $scope.email,
                    "password": $scope.password
                };

                loginService.login(data);
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.login = login();

        }]);