'use strict';

app.factory('loginService', function($http, $location, sessionService){
	var $loginService = {};

	$loginService.login = function(data, scope){
		// verify user credentials
		var $promise = $http.post('../session/user.php', data);
		$promise.then(function(msg) {
			var uid = msg.data;
			if(uid) {
				sessionService.set('uid',uid);
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