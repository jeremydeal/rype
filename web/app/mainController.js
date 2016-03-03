'use strict';

app.controller('mainController',
    ['$scope', 'loginService',
        function($scope, $location, loginService) {

            // store current user's id, if available, to determine navbar appearance
            $scope.currentUserId = loginService.currentUserId;

        }]);