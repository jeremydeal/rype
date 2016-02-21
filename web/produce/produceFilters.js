app.filter('filterProduceByWhetherInSeason', function () {
    return function (products, inSeason) {
        // if inSeason is false, don't filter
        if (inSeason == null || !inSeason) {
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
            var start = months.indexOf(p.SeasonStart.toLowerCase());
            var end = months.indexOf(p.SeasonEnd.toLowerCase());

            var curMonth = new Date().getMonth();

            if (start && end) {
                // add to filtered if the season is year-round
                if (start == end) {
                    filtered.push(p);
                    console.log("Item passed filter: start date == end date.");
                }
                else {
                    // check date if season within same calendar year
                    if (start < curMonth < end) {
                        filtered.push(p);
                        console.log("Item passed filter: in season, same calendar year ");
                    }

                    // check date if season extends over 2 calendar years
                    if (start > end && (curMonth < end || curMonth > start)) {
                        filtered.push(p);
                        console.log("Item passed filter: in season, across calendar years");
                    }

                    console.log("Item rejected: not in season.");
                }
            }
            else {
                console.log("Item rejected: start or end dates not defined.");
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