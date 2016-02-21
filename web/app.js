'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'perfect_scrollbar'
]);

// ROUTING
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: "app/home/home.html",
        controller: 'homeController'
    });
    $routeProvider.when('/produce', {
        templateUrl: 'app/produce/produce.html',
        controller: 'produceController'
    });
    $routeProvider.when('/stores', {
        templateUrl: 'app/stores/stores.html',
        controller: 'storesController'
    });
    $routeProvider.otherwise({redirectTo: '/produce'});
}]);