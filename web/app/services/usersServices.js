'use strict';

app.factory('usersService', function($http) {
    var usersService = {};
    var baseUrl = "../api/user/";
    var loginUrl = "../login/";

    usersService.getUser = function() {
        return $http.get(baseUrl + "get/");
    };

    usersService.login = function(user){
        return $http.post(loginUrl + "login/", user);
    };

    usersService.logout = function() {
        return $http.get(loginUrl + "logout/");
    };

    usersService.createUser = function(user) {
        return $http.post(baseUrl + "create/", user);
    };

    return usersService;
});