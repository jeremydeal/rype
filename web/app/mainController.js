(function() {

    'use strict';

    app.controller('mainController',
        ['$scope', '$loginService', '$rootScope',
            function ($scope, $loginService, $rootScope) {
                // $loginService.checkLoginStatus()
                //     .then(function successCallback(response) {
                //         $rootScope.isLoggedIn = !!response.data;
                //     }, function errorCallback(response) {
                //         $rootScope.isLoggedIn = false;
                //     });
            }]);

})();