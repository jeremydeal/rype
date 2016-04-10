(function() {

    'use strict';


    app.directive('staticStarRatingDirective', function () {

        var directive = {};

        // restrict to use in attribute name or element name
        directive.restrict = 'AE';

        // isolate the scope; two-way binding for both vars
        directive.scope = {
            score: '=',
            max: '='
        };

        directive.templateUrl = "app/directives/staticStarRatingDirective.html";

        directive.link = function(scope, element, attrs) {

            scope.updateStars = function() {
                scope.stars = [];
                for (var starId = 0; starId < scope.max; starId += 1) {
                    scope.stars.push({
                        full: scope.score > starId
                    });
                }
            };

            scope.starClass = function(/* Star */ star, /* Integer */ index) {
                // add FontAwesome classes to the <i> tags to generate full/empty stars
                var starClass = 'fa-star-o';
                if (star.full) {
                    starClass = 'fa-star';
                }
                return starClass;
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