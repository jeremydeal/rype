'use strict';

app.controller('loginController',
    ['$scope', 'usersService',
        function($scope, usersService) {

            // nav variable
            $scope.panel = "login";

            // scope variables for login
            $scope.loginUser = {};
            $scope.loginUser.Email = "";
            $scope.loginUser.Password = "";

            $scope.currentUser = {};

            // scope variables for createUser
            $scope.newUser = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                // if a user is currently logged in, welcome!
                getUser();
                if ($scope.currentUser.length > 0) {
                    $scope.panel = "welcome";
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
                usersService.login($scope.loginUser)
                    .success(function(data) {
                        console.log(data.message)
                    })
            }

            function logout() {
                usersService.logout()
                    .success(function(data) {
                        console.log(data.message)
                    })
            }

            function createUser() {
                usersService.createUser($scope.newUser)
                    .success(function(data) {

                        // if creation successful, log in!
                        var loginData = {
                            "Email": $scope.newUser.Email,
                            "Password": $scope.newUser.Password
                        };

                        usersService.login(loginData)
                            .success(function(data) {
                                console.log(data.message)
                            })
                    })
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.isLoggedIn = function() { getUser() };
            $scope.login = function() { login() };
            $scope.logout = function() { logout() };
            $scope.createUser = function(user) { createUser(user) };
            $scope.changePanel = function(panel) {
                $scope.panel = panel;
            };

        }]);