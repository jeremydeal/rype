(function() {

    'use strict';

    describe('productsFilter', function() {
        beforeEach(function() {
            angular.module('myApp')
        });

        var $filter,  FilterNAMe ;
        beforeEach(function () {
            angular.mock.module("myApp", function ($provide) {
                $provide.value('loginService');
            });
        });

        it('check for filterProductsByClass', inject(function($filter) {
            expect($filter('filterProductsByClass')).not.toBeNull();
        }));
    });

})();