describe('productsController', function(){

    var $controllerConstructor;
    var scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
    }));


    it('should have three products', function(){
        var ctrl = $controllerConstructor('productsController', {$scope:scope});
        expect(Object.size(ctrl.products)).toBe(3);
    });


});