(function() {

    'use strict';

    app.filter('filterProductsBySearch', function () {
        return function (products, query) {
            if (!products) return products;
            if (!query) return products;

            var filtered = [];

            angular.forEach(products, function (p) {
                var toSearch = (p.CommonName + " " + p.Variety).toLowerCase();
                if (toSearch.indexOf(query.toLowerCase()) > -1) {
                    filtered.push(p);
                }
            });

            return filtered;
        };
    });

    app.filter('filterProductsByWhetherInSeason', function () {
        return function (products, inSeason) {
            // if inSeason is false, don't filter
            if (!products) return products;
            if (!inSeason) return products;

            // dictionary of 0-indexed months to check current data against
            var months = ['january', 'february', 'march',
                'april', 'may', 'june', 'july', 'august',
                'september', 'october', 'november', 'december'];

            var curMonth = new Date().getMonth();
            var filtered = [];

            // iterate through products
            angular.forEach(products, function (p) {

                if (!p.SeasonStart || !p.SeasonEnd) {
                    console.log("%o rejected: start or end dates not defined.", p);
                }
                else {

                    // get 0-indexed value of months
                    var start = months.indexOf(p.SeasonStart.toLowerCase());
                    var end = months.indexOf(p.SeasonEnd.toLowerCase());

                    // add to filtered if the season is year-round
                    if (start == end) {
                        filtered.push(p);
                        console.log("%o passed filter: start date == end date\ncurMonth = %s\nstart = %s\nend = %s", p, curMonth, start, end);
                    }
                    else {
                        if (start < curMonth && curMonth < end) {
                            // check date if season within same calendar year
                            filtered.push(p);
                            console.log("%o passed filter: in season, same calendar year.\ncurMonth = %s\nstart = %s\nend = %s", p, curMonth, start, end);
                        }
                        else if (start > end && (curMonth < end || curMonth > start)) {
                            // check date if season extends over 2 calendar years
                            filtered.push(p);
                            console.log("%o passed filter: in season, across calendar years\ncurMonth = %s\nstart = %s\nend = %s", p, curMonth, start, end);
                        }
                        else {
                            console.log("%o rejected: not in season\ncurMonth = %s\nstart = %s\nend = %s", p, curMonth, start, end);
                        }
                    }
                }
            });

            return filtered;
        };
    });

    app.filter('filterProductsByClass', function () {
        return function (products, className) {
            if (!products) return products;
            if (!className) return products;

            var filtered = [];

            angular.forEach(products, function (p) {
                if (p.ProduceClass == className) {
                    filtered.push(p);
                }
            });

            return filtered;
        };
    });

    app.filter('filterProductsByType', function () {
        return function (products, typeId) {
            if (!products) return products;
            if (!typeId) return products;

            var filtered = [];

            angular.forEach(products, function (p) {
                if (p.ProduceTypeId == typeId) {
                    filtered.push(p);
                }
            });

            return filtered;
        };
    });

    app.filter('bringShoppingListItemsToTop', function () {
        return function (products, shoppingListIds) {
            if (!products) return products;
            if (!shoppingListIds) return shoppingListIds;

            console.log(shoppingListIds);

            var filtered = [];
            var shoppingList = [];

            angular.forEach(products, function (p) {
                if (shoppingListIds.indexOf(p.ProduceId) > -1) {
                    shoppingList.unshift(p);
                } else {
                    filtered.push(p);
                }
            });

            angular.foreach(shoppingList, function(p) {
                filtered.unshift(p);
            });

            return filtered;
        };
    });

})();