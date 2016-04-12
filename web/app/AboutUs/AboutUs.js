/**
 * Created by Alycia on 4/12/2016.
 */
(function() {

    'use strict';

    app.controller('aboutUsController',
        ['$scope', 'sessionService',
            function ($scope, sessionService) {

                // scope variables for login
                $scope.user = {};

                dataInit();


                /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
                function dataInit() {
                    populateUser();
                }


                /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
                // populate user object from JS session
                function populateUser() {
                    $scope.user = sessionService.getUser();
                }


            }]);

})();