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
                usersService.login($scope.loginUser)
                    .success(function(data) {
                        // go to welcome screen!
                        if (Object.size(data.user) > 0) {
                            $scope.currentUser = data.user;
                            changePanel('welcome');
                        }
                    })
            }

            function logout() {
                usersService.logout();
                clearUserInfo();
                changePanel('login');
            }

            function createUser() {
                usersService.createUser($scope.newUser)
                    .success(function(data) {

                        // if creation successful, log in!
                        if (data.message == "success") {
                            $scope.currentUser = $scope.newUser;
                            changePanel('welcome');
                        }
                    })
            }


            /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////
            function changePanel(panel) {
                $scope.panel = panel;
            }

            function clearUserInfo() {
                $scope.currentUser = {};
                $scope.newUser = {};
                $scope.loginUser = {};
                $scope.loginUser.Email = "";
                $scope.loginUser.Password = "";
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.isLoggedIn = function() { getUser() };
            $scope.login = function() { login() };
            $scope.logout = function() { logout() };
            $scope.createUser = function() { createUser() };
            $scope.changePanel = function(panel) {
                changePanel(panel);
            };

        }]);