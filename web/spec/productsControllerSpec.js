(function() {

    'use strict';

    describe('productsController', function() {
        beforeEach(module('myApp', []));

        var $controller;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('$scope test', function() {
            var $scope, controller;

            beforeEach(function() {
                $scope = {};
                controller = $controller('productsController', {
                    $scope: $scope,

                });
            });

            it('sets the strength to "strong" if the password length is >8 chars', function() {
                $scope.password = '12345678';
                expect($scope.password.length).toEqual(8);
            });
        });
    });

    //
    //describe('productsController', function () {
    //
    //    var $controllerConstructor;
    //    var scope;
    //
    //    beforeEach(function() {
    //        module('myApp');
    //        module('slick');
    //    });
    //
    //    beforeEach(inject(function(_$controller_){
    //        // The injector unwraps the underscores (_) from around the parameter names when matching
    //        $controller = _$controller_;
    //    }));
    //
    //    //// register mock of ProductsService
    //    //beforeEach(angular.mock.module(function($provide) {
    //    //    $provide.service('productsService', function($productsService) {
    //    //        $productsService.getProducts = function() {
    //    //            return {"hardcoded": "value"}
    //    //        }
    //    //    })
    //    //}));
    //
    //    // controller constructor
    //    beforeEach(inject(function ($controller, $rootScope) {
    //        $controllerConstructor = $controller;
    //        scope = $rootScope.$new();
    //    }));
    //
    //
    //    it('should have three products', function () {
    //        var ctrl = $controllerConstructor('productsController', {$scope: scope});
    //        expect(Object.size(ctrl.products)).toBe(3);
    //    });
    //
    //});

})();