(function() {

    'use strict';

    app.filter('bringPreferredStoreToTop', function () {
        return function (stores, preferredStoreId) {
            if (!stores) return stores;
            if (!preferredStoreId) return stores;

            var filtered = [];

            angular.forEach(stores, function (s) {
                if (s.StoreId == preferredStoreId) {
                    filtered.unshift(s);
                } else {
                    filtered.push(s);
                }
            });

            return filtered;
        };
    });

})();