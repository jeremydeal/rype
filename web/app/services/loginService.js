'use strict';

app.factory('loginService', function($http, $location, sessionService) {
	var $loginService = {};
	var baseUrl = "../api/user/";

	$loginService.login = function(data, scope) {

		$http.post(baseUrl + "login/", data)
			.then(function(response) {

				var user = response.data;
				if (user) {
					// if we received a user object, store basic user info
					sessionService.set('uid', user.CustomerId);
					sessionService.set('Username', user.Username);
					sessionService.set('FirstName', user.FirstName);
					sessionService.set('LastName', user.LastName);
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
				if (response.data.length > 0) {
					$location.path('/login');
				}
			});
	};

	$loginService.isLogged = function() {
		//return (sessionService.get('uid') != null);
		return $http.get(baseUrl + 'check/')
			.then(function(response) {
				return response.data.length > 0;
			})
	};

	$loginService.createUser = function(user, scope) {
		var $promise = $http.post(baseUrl + 'create/', user);

		$promise.then(function(response) {

				// if user creation is successful, log in!
				if (response.data) {
					$loginService.login(user, scope);
				}
			}
		)

	};

	return $loginService;

});