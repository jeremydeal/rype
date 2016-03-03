'use strict';

app.factory('sessionService', ['$http', function($http){
	var $sessionService = {};

	$sessionService.set = function(key, value){
		return sessionStorage.setItem(key, value);
	};

	$sessionService.get = function(key){
		return sessionStorage.getItem(key);
	};

	$sessionService.destroy = function(key){
		return sessionStorage.removeItem(key);
	};

	return $sessionService;
}]);