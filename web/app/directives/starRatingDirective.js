(function() {

    'use strict';


    app.directive('starRatingDirective', function () {

        var directive = {};

        // restrict to use in attribute name or element name
        directive.restrict = 'AE';

        // isolate the scope; two-way binding for both vars
        directive.scope = {
            score: '=score',
            max: '=max'
        };

        directive.templateUrl = "app/directives/starRatingDirective.html";

        directive.link = function(scope, element, attrs) {

            scope.updateStars = function() {
                scope.stars = [];
                for (var starId = 0; starId < scope.max; starId += 1) {
                    scope.stars.push({
                        full: scope.score > starId
                    });
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
                if (index <= scope.hoverIndex) {
                    starClass = 'rating-highlight';
                }
                return starClass;
            };

            scope.starClass = function(/* Star */ star, /* Integer */ index) {
                var starClass = 'fa-star-o';
                if (star.full || index <= scope.hoverIndex) {
                    starClass = 'fa-star';
                }
                return starClass;
            };

            scope.setRating = function(index) {
                scope.score = index + 1;
                scope.stopHover();
                console.log("Rating is now " + str(scope.score));
                scope.$apply(attrs.ratingFunction);
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