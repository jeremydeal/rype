'use strict';

app.factory('loginService', function($http, $location, sessionService){
	var $loginService = {};

	$loginService.login = function(data, scope){
		// verify user credentials
		var $promise = $http.post('../session/authenticate_user.php', data);
		$promise.then(function(data) {
			if(data) {
				var uid = data.user.uid;

				// store session unique id
				sessionService.set('uid',uid);

				// store user in JS session
				var user = data.user;
				user.uid = null;
				sessionService.set('user', user);

				$location.path('/dashboard');
			}
			else  {
				scope.msg = 'Incorrect information.';
				$location.path('/login');
			}
		});
	};

	$loginService.logout = function(){
		sessionService.destroy('uid');
		$location.path('/login');
	};

	$loginService.islogged = function(){
		return $http.post('../session/check_session.php');
	};

	return $loginService;

});