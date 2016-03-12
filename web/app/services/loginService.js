(function() {

	'use strict';

	app.factory('loginService', function ($http, $location, $rootScope, sessionService) {
		var $loginService = {};
		var baseUrl = "../api/user/";


		$loginService.currentUserId = "";

		// create a server-side session for the user and store the user info in a client-side session
		$loginService.login = function (data, scope) {

			$http.post(baseUrl + "login/", data)
				.then(function (response) {

					if (!!response.data.user) {

						// if we received a user object, store basic user info
						var user = response.data.user;
						sessionService.setUser(user);

						// update service's current logged user
						$rootScope.currentUserId = "true";

						$location.path('/dashboard');
					}
					else {
						// if no user object, return to the login page
						scope.msg = 'incorrect information';
						$location.path('/login');
					}
				});
		};

		// destroy client and server-side user sessions
		$loginService.logout = function () {
			sessionService.destroyUser();

			$http.get(baseUrl + 'logout/')
				.then(function (response) {
					if (!!response.data) {

						// update service's current logged user
						$rootScope.currentUserId = "";

						$location.path('/login');
					}
				});
		};

		// check for server-side user session;
		// return a string if true, nothing if false
		$loginService.checkLoginStatus = function () {
			return $http.get(baseUrl + 'check/');
		};

		// create user in DB;
		// if successful, log in automatically
		$loginService.createUser = function (user, scope) {
			$http.post(baseUrl + 'create/', user)
				.then(function (response) {

					// LOG IN AUTOMATICALLY
					if (!!response.data.user) {

						// if we received a user object, store basic user info
						var user = response.data.user;
						sessionService.setUser(response.data.user);

						// update service's current logged user
						$rootScope.currentUserId = "true";

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

})();