'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'perfect_scrollbar'
]);

// ROUTING
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/produce', {
        templateUrl: 'produce/produce.html',
        controller: 'produceController'
    });
    $routeProvider.when('/home', {
        templateUrl: "home/home.html",
        controller: 'homeController'
    });
    $routeProvider.otherwise({redirectTo: '/produce'});
}]);