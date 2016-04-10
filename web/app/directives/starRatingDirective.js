(function() {

    'use strict';

    app.directive('starRatingDirective', function ($timeout) {

        var directive = {};

        // restrict to use in attribute name or element name
        directive.restrict = 'AE';

        // isolate the scope; two-way binding for both vars
        directive.scope = {
            score: '=',
            max: '=',
            onRate: "&"
        };

        directive.templateUrl = "app/directives/starRatingDirective.html";

        directive.link = function(scope, element, attrs) {

            var rated = false;

            scope.updateStars = function() {
                if (!rated) {
                    scope.stars = [];
                    for (var starId = 0; starId < scope.max; starId += 1) {
                        scope.stars.push({
                            full: scope.score > starId
                        });
                    }
                }
            };

            scope.hover = function(/* Integer */ index) {
                scope.hoverIndex = index;
            };

            scope.stopHover = function() {
                scope.hoverIndex = -1;
            };

            scope.starColor = function(/* Integer */ index) {
                var starClass = 'rating-normal';
                if (rated || index <= scope.hoverIndex) {
                    starClass = 'rating-highlight';
                }
                return starClass;
            };

            scope.starClass = function(/* Star */ star, /* Integer */ index) {
                // add FontAwesome classes to the <i> tags to generate full/empty stars
                var starClass = 'fa-star-o';
                if (star.full || (!rated && index <= scope.hoverIndex)) {
                    starClass = 'fa-star';
                }
                return starClass;
            };

            scope.setRating = function(index) {
                scope.score = index + 1;
                scope.stopHover();
                console.log("Rating is now " + scope.score);
                scope.onRate({ rating: scope.score });

                // refresh and then disable for future ratings
                scope.updateStars();
                rated = true;
            };

            scope.$watch('score', function(newValue, oldValue) {
                if (newValue !== null && newValue !== undefined) {
                    scope.updateStars();
                }
            });
        };

        return directive;

    });

})();