'use strict';

app.controller('createUserController',
    ['$scope', '$location', 'usersService',
        function($scope, $location, usersService) {

            $scope.user = {};

            dataInit();


            /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
            function dataInit() {
                //// if a user is currently logged in, welcome!
                //getUser();
                //if (Object.size($scope.currentUser) > 0) {
                //    changePanel("welcome");
                //}
            }


            /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
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
            function clearUserInfo() {
                $scope.user = {};
            }


            /////////////////////////////// VIEW METHODS ////////////////////////////////////////////////////
            $scope.createUser = function() { createUser() };

        }]);