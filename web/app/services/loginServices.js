'use strict';

app.factory('loginService', function($http) {
    var loginService = {};
    var baseUrl = "../api/user/";

    loginService.login = function(data){
        return $http.post(baseUrl + "login/", data);
    };

    return loginService;
});