(function() {

    'use strict';

    app.controller('mainController',
        ['$scope', 'loginService', '$rootScope',
            function ($scope, loginService, $rootScope) {

                // get an HTTP promise to check auth
                loginService.checkLoginStatus()
                    .then(function(response){
                        $rootScope.isLoggedIn = !!response.data;
                    });

            }]);
})();