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

        it('checks for existence of filterProductsByClass', inject(function($filter) {
            var filterProductsByClass = $filter('filterProductsByClass');
            expect(filterProductsByClass([{ProduceClass:1}], 1)).toEqual([{ProduceClass:1}]);
            expect(filterProductsByClass([{ProduceClass:1}], 2)).toEqual([]);
        }));

    });

})();