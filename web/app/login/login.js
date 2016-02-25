'use strict';

app.controller('loginController',
    ['$scope', '$location', 'usersService',
        function($scope, $location, usersService) {

            // scope variables for login
            $scope.user = {};
            $scope.user.Email = "";
            $scope.user.Password = "";

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                // if a user is currently logged in, welcome!
                getUser();
                if (Object.size($scope.currentUser) > 0) {
                    changePanel("welcome");
                }
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            function getUser() {
                usersService.getUser()
                    .success(function(data) {
                        $scope.currentUser = data.user;
                    })
            }

            function login() {
                usersService.login($scope.user)
                    .success(function(data) {
                        // go to welcome screen!
                        if (Object.size(data.user) > 0) {
                            $rootScope.user = data.user;
                            $location('/dashboard');        // TODO: change path here
                        }
                    })
            }


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function clearUserInfo() {
                $scope.user = {};
                $scope.user.Email = "";
                $scope.user.Password = "";
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.isLoggedIn = function() { getUser() };
            $scope.login = function() { login() };
            $scope.createUser = function() {
                $location('/createUser');        // TODO: navigate to somewhere
            }

        }]);