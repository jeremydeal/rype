(function() {

    'use strict';

    describe('productsController', function () {

        var $controllerConstructor;
        var scope;

        beforeEach(function() {
            module('myApp');
            module('slick');
        });

        //// register mock of ProductsService
        //beforeEach(angular.mock.module(function($provide) {
        //    $provide.service('productsService', function($productsService) {
        //        $productsService.getProducts = function() {
        //            return {"hardcoded": "value"}
        //        }
        //    })
        //}));

        // controller constructor
        beforeEach(inject(function ($controller, $rootScope) {
            $controllerConstructor = $controller;
            scope = $rootScope.$new();
        }));


        it('should have three products', function () {
            var ctrl = $controllerConstructor('productsController', {$scope: scope});
            expect(Object.size(ctrl.products)).toBe(3);
        });

    });

})();