(function() {

	'use strict';

	app.factory('sessionService', ['$http', function ($http) {
		var $sessionService = {};

		$sessionService.set = function (key, value) {
			return sessionStorage.setItem(key, value);
		};

		$sessionService.get = function (key) {
			return sessionStorage.getItem(key);
		};

		$sessionService.destroy = function (key) {
			return sessionStorage.removeItem(key);
		};

		$sessionService.setUser = function (user) {
			sessionStorage.setItem('CustomerId', user.CustomerId);
			sessionStorage.setItem('Username', user.Username);
			sessionStorage.setItem('Email', user.Email);
			sessionStorage.setItem('FirstName', user.FirstName);
			sessionStorage.setItem('LastName', user.LastName);
			sessionStorage.setItem('PreferredStore', user.PreferredStore);
		};

		$sessionService.getUser = function () {
			var user = {};

			user.CustomerId = sessionStorage.getItem('CustomerId');
			user.Username = sessionStorage.getItem('Username');
			user.Email = sessionStorage.getItem('Email');
			user.FirstName = sessionStorage.getItem('FirstName');
			user.LastName = sessionStorage.getItem('LastName');
			user.PreferredStore = sessionStorage.getItem('PreferredStore');

			return user;
		};

		$sessionService.userExists = function () {
			return !!sessionStorage.getItem('CustomerId');
		};


		$sessionService.destroyUser = function () {
			sessionStorage.removeItem('CustomerId');
			sessionStorage.removeItem('Username');
			sessionStorage.removeItem('Email');
			sessionStorage.removeItem('FirstName');
			sessionStorage.removeItem('LastName');
			sessionStorage.removeItem('PreferredStore');
		};


		return $sessionService;
	}]);

})();