'use strict';

app.factory('loginService', function($http, $location, sessionService) {
	var $loginService = {};

	$loginService.login = function(data, scope){

		var $promise = $http.post('../session/authenticate_user.php', data);

		$promise.then(function(response) {
			var uid = response.data;
			console.log(uid);
			if (uid) {
				sessionService.set('uid', uid);
				$location.path('/dashboard');
			}
			else {
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