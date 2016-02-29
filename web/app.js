'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'perfect_scrollbar'
]);

// ROUTING
app.config(['$routeProvider', function($routeProvider) {
    // user pages
    $routeProvider.when('/login', {
        templateUrl: "app/login/login.html",
        controller: 'loginController'
    });
    $routeProvider.when('/dashboard', {
        templateUrl: "app/dashboard/dashboard.html",
        controller: 'dashboardController'
    });
    $routeProvider.when('/createUser', {
        templateUrl: "app/createUser/createUser.html",
        controller: 'createUserController'
    });

    // content pages
    $routeProvider.when('/home', {
        templateUrl: "app/home/home.html",
        controller: 'homeController'
    });
    $routeProvider.when('/products', {
        templateUrl: 'app/products/products.html',
        controller: 'productsController'
    });
    $routeProvider.when('/stores', {
        templateUrl: 'app/stores/stores.html',
        controller: 'storesController'
    });
    $routeProvider.otherwise({redirectTo: '/products'});
}]);

// deny permission on certain pages if not logged in
app.run(function($rootScope, $location, loginService){
    // routes that require login
    var routePermissions = ['/dashboard'];

    $rootScope.$on('$routeChangeStart', function(){
        // if the route requires permission...
        if( routePermissions.indexOf($location.path()) != -1)
        {
            // ...check to see if the user has a session registered
            var connected = loginService.isLogged();
            connected.then(function(msg){
                // if isLogged() returns nothing, redirect to login
                if (!msg.data) $location.path('/login');
            });
        }
        //  if the user is logged in but routes to login, redirect to dashboard
        else if  ($location.path() == '/login')
        {
            var connected = loginService.isLogged();
            connected.then(function(msg){
               if (msg.data) $location.path('/dashboard');
            });
        }

    });
});