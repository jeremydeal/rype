'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'ngScrollbar'
]);

// ROUTING
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/produce', {
        templateUrl: 'produce/produce.html',
        controller: 'produceController'
    });
    $routeProvider.when('/test1', {
        templateUrl: "test/test1.html",
        controller: 'testController'
    });
    $routeProvider.otherwise({redirectTo: '/produce'});
}]);