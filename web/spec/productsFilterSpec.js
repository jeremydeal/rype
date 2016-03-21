(function() {

    'use strict';

    describe('productsFilter', function() {
        beforeEach(function() {
            module('myApp')
        });

        it('check for filterProductsByClass', inject(function($filter) {
            expect($filter('filterProductsByClass')).not.toBeNull();
        }));
    });

})();