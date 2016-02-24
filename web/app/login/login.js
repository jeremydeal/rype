'use strict';

app.controller('loginController',
    ['$scope', 'loginService',
        function($scope, loginService) {

            $scope.email = "";
            $scope.password = "";

            $scope.login = function() {
                loginService.login($scope.email, $scope.password);
            }

        }]);