'use strict';

app.factory('loginService', function($http, $location, sessionService) {
	var $loginService = {};
	var baseUrl = "../api/user/";

	$loginService.login = function(data, scope) {

		$http.post(baseUrl + "login/", data)
			.then(function(response) {

				if (!!response.data.user) {
					// if we received a user object, store basic user info
					sessionService.setUser(response.data.user);
					$location.path('/dashboard');
				}
				else {
					// if no user object, return to the login page
					scope.msg = 'incorrect information';
					$location.path('/login');
				}
			});
	};

	$loginService.logout = function() {
		sessionService.destroy('uid');
		sessionService.destroy('Username');
		sessionService.destroy('FirstName');
		sessionService.destroy('LastName');

		$http.get(baseUrl + 'logout/')
			.then(function(response) {
				if (!!response.data) {
					$location.path('/login');
				}
			});
	};

	$loginService.isLogged = function() {
		//return (sessionService.get('uid') != null);
		return $http.get(baseUrl + 'check/');
	};

	$loginService.createUser = function(user, scope) {
		$http.post(baseUrl + 'create/', user)
			.then(function(response) {

				// LOG IN AUTOMATICALLY
				if (!!response.data.user) {
					// if we received a user object, store basic user info
					sessionService.setUser(response.data.user);

					$location.path('/dashboard');
				}
				else {
					// if no user object, return to the login page
					scope.msg = 'user creation failed';
				}
			});

	};

	return $loginService;

});