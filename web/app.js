'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute'
]);

// ROUTING
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/personal', {
        templateUrl: 'produce/produce.html',
        controller: 'produceController'
    });
    $routeProvider.otherwise({redirectTo: '/produce'});
}]);