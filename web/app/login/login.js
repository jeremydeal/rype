'use strict';

app.controller('loginController',
    ['$scope', '$location', 'loginService',
        function($scope, $location, loginService) {

            // scope variables for login
            $scope.user = {};
            $scope.user.Username = "";
            $scope.user.Password = "";

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {}


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            $scope.login = function(data){
                loginService.login(data, $scope);
            };


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.createUser = function() {
                $location.path('/createUser');        // TODO: navigate to somewhere
            }

        }]);