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
			sessionStorage.setItem('uid', user.CustomerId);
			sessionStorage.setItem('Username', user.Username);
			sessionStorage.setItem('Email', user.Email);
			sessionStorage.setItem('FirstName', user.FirstName);
			sessionStorage.setItem('LastName', user.LastName);
		};

		$sessionService.getUser = function () {
			var user = {};

			user.CustomerId = sessionStorage.getItem('uid');
			user.Username = sessionStorage.getItem('Username');
			user.Email = sessionStorage.getItem('Email');
			user.FirstName = sessionStorage.getItem('FirstName');
			user.LastName = sessionStorage.getItem('LastName');

			return user;
		};


		$sessionService.destroyUser = function () {
			sessionStorage.removeItem('uid');
			sessionStorage.removeItem('Username');
			sessionStorage.removeItem('Email');
			sessionStorage.removeItem('FirstName');
			sessionStorage.removeItem('LastName');
		};


		return $sessionService;
	}]);

})();