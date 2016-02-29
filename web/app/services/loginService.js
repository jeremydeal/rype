'use strict';

app.factory('loginService', function($http, $location, sessionService) {
	var $loginService = {};

	$loginService.login = function(data, scope){

		var $promise = $http.post('../session/authenticate_user.php', data);

		$promise.then(function(response) {

			var user = response.data.user;
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

	$loginService.logout = function(){
		sessionService.destroy('uid');
		sessionService.destroy('Username');
		sessionService.destroy('FirstName');
		sessionService.destroy('LastName');
		$location.path('/login');
	};

	$loginService.isLogged = function(){
		return $http.post('../session/check_session.php');
	};

	return $loginService;

});