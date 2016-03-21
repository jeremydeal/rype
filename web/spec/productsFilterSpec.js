(function() {

    'use strict';

    describe('productsFilter', function() {
        beforeEach(function() {
            angular.module('myApp');
            angular.mock.module("myApp", function ($provide) {
                $provide.value('loginService');
            });
        });

        it('checks for existence of filterProductsByClass', inject(function($filter) {
            expect($filter('filterProductsByClass')).not.toBeNull();
        }));

        it('checks for existence of filterProductsByClass', inject(function(filterProductsByClass) {
            expect([{ProduceClass:1}], 1).toBe([{ProduceClass:1}]);
            expect([{ProduceClass:1}], 2).toBe();
        }));

    });

})();