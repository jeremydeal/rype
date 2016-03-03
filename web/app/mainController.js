'use strict';

app.controller('mainController',
    ['$scope', 'loginService', '$rootScope',
        function($scope, loginService, $rootScope) {

            // store current user's id, if available, to determine navbar appearance
            $scope.currentUserId = $rootScope.currentUserId;

        }]);