'use strict';

app.factory('loginService', function($http, $location, sessionService) {
	var $loginService = {};

	$loginService.login = function(data, scope){

		var $promise = $http.post('../session/authenticate_user.php', data);

		$promise.then(function(response) {

			var user = response.data;
			if (user) {
				// if we received a user object, store basic user info
				sessionService.set('uid', user.CustomerId);
				sessionService.set('username', user.Username);
				sessionService.set('firstName', user.FirstName);
				sessionService.set('lastName', user.LastName);
				$location.path('/dashboard');
			}
			else {
				// if no user object, return to the login page
				scope.msg = 'incorrect information';
				$location.path('/login');
			}
		});
	};

	$loginService.logout = function(){
		sessionService.destroy('uid');
		$location.path('/login');
	};

	$loginService.isLogged = function(){
		return $http.post('../session/check_session.php');
	};

	return $loginService;

});