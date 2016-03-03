'use strict';

app.factory('sessionService', ['$http', function($http){
	var $sessionService = {};

	$sessionService.set = function(key, value) {
		return sessionStorage.setItem(key, value);
	};

	$sessionService.get = function(key) {
		return sessionStorage.getItem(key);
	};

	$sessionService.destroy = function(key) {
		return sessionStorage.removeItem(key);
	};

	$sessionService.setUser = function(user) {
		sessionStorage.set('uid', user.CustomerId);
		sessionStorage.set('Username', user.Username);
		sessionStorage.set('Email', user.Email);
		sessionStorage.set('FirstName', user.FirstName);
		sessionStorage.set('LastName', user.LastName);
	};

	$sessionService.getUser = function() {
		var user = {};

		user.CustomerId = sessionStorage.get('uid');
		user.Username = sessionStorage.get('Username');
		user.Email = sessionStorage.get('Email');
		user.FirstName = sessionStorage.get('FirstName');
		user.LastName = sessionStorage.get('LastName');

		return user;
	};


	return $sessionService;
}]);