'use strict';

app.factory('usersService', function($http) {
    var usersService = {};
    var baseUrl = "../api/user/";

    usersService.getUser = function() {
        return $http.get(baseUrl + "get/");
    };

    usersService.login = function(user){
        return $http.post(baseUrl + 'login/', user);
    };

    usersService.logout = function() {
        return $http.get(baseUrl + "logout/");
    };

    usersService.createUser = function(user) {
        return $http.post(baseUrl + "create/", user);
    };

    return usersService;
});