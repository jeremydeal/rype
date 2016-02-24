'use strict';

app.controller('loginController',
    ['$scope', 'usersService',
        function($scope, usersService) {

            // nav variable
            $scope.panel = "login";

            // scope variables for login
            $scope.login = {};
            $scope.login.Email = "";
            $scope.login.Password = "";

            $scope.currentUser = {};

            // scope variables for createUser
            $scope.newUser = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                getUser();
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
            function getUser() {
                usersService.getUser()
                    .success(function(data) {
                        $scope.currentUser = data.user;
                    })
            }

            function login() {
                var data = {
                    "email": $scope.loginEmail,
                    "password": $scope.loginPassword
                };

                usersService.login(data)
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
                            "email": $scope.newUser.Email,
                            "password": $scope.newUser.Password
                        };

                        usersService.login(loginData)
                            .success(function(data) {
                                console.log(data.message)
                            })
                    })
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.isLoggedIn = getUser();
            $scope.login = login();
            $scope.logout = logout();
            $scope.createUser = createUser(user);

        }]);