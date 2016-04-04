'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'perfect_scrollbar',
    'slick'
]);

var myapp = angular.module('myapp', ["highcharts-ng"]);

app.config(['$routeProvider', function($routeProvider) {

    // ROUTING
    $routeProvider

        // user pages
        .when('/login', {
            templateUrl: "app/login/login.html",
            controller: 'loginController'
        })
        .when('/dashboard', {
            templateUrl: "app/dashboard/dashboard.html",
            controller: 'dashboardController'
        })
        .when('/createUser', {
            templateUrl: "app/createUser/createUser.html",
            controller: 'createUserController'
        })

        // content pages
        .when('/home', {
            templateUrl: "app/home/home.html",
            controller: 'homeController'
        })
        .when('/products', {
            templateUrl: 'app/products/products.html',
            controller: 'productsController'
        })
        .when('/stores', {
            templateUrl: 'app/stores/stores.html',
            controller: 'storesController'
        })
        .when('/store', {
            templateUrl: 'app/store/store.html',
            controller: 'storeController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);


// UPON ROUTING
// deny permission on certain pages if not logged in
app.run(function($rootScope, $location, loginService){
    // routes that require login
    var routePermissions = ['/dashboard'];

    $rootScope.$on('$routeChangeStart', function(){

        // get an HTTP promise to check auth
        var connected = loginService.checkLoginStatus();

        // if the route requires permission...
        if( routePermissions.indexOf($location.path()) != -1)
        {
            // ...check to see if the user has a session registered
            connected.then(function(response){
                // if not logged in, redirect to login
                if (!response.data) $location.path('/login');
            });
        }
        else if ( $location.path() == '/login' || $location.path() == '/createUser')
        {
            // ...check session
            connected.then(function(response){
                // if logged in, redirect to dashboard
                if (!!response.data) $location.path('/dashboard');
            });
        }

    });
});
