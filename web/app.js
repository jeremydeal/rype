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