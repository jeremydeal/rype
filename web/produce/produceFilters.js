app.filter('filterProduceByWhetherInSeason', function () {
    return function (products, inSeason) {
        // if inSeason is false, don't filter
        if (inSeason == null || inSeason == false || inSeason.isEmpty()) {
            return products;
        }

        // dictionary of 0-indexed months to check current data against
        var months = ['january', 'february', 'march',
            'april', 'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december'];

        // iterate through products
        var filtered = {};
        for (var i = 0; i < products.length; i++) {
            var p = products[i];

            // get 0-indexed value of months
            var start = months.indexOf(p.SeasonStart.trim().toLowerCase());
            var end = months.indexOf(p.SeasonEnd.trim().toLowerCase());

            var curMonth = new Date().getMonth();

            // add to filtered if the season is year-round
            if (start.isEmpty() || end.isEmpty() || start == end) {
                filtered.push(p);
            }
            else {
                // check date if season within same calendar year
                if (start < curMonth < end) {
                    filtered.push(p);
                }

                // check date if season extends over 2 calendar years
                if (start > end && (curMonth < end || curMonth > start)) {
                    filtered.push(p);
                }
            }
        }
        return filtered;
    };
});

app.filter('filterProduceByType', function () {
    return function (products, typeId) {
        if (typeId == null || typeId == "") {
            return products;
        }

        var filtered = {};
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.ProduceTypeId == typeId) {
                filtered.push(p);
            }
        }
        return filtered;
    };
});