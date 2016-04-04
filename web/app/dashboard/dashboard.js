(function() {

    'use strict';

    app.controller('dashboardController',
        ['$scope', 'loginService', 'sessionService',
            function ($scope, loginService, sessionService) {

                // scope variables for login
                $scope.user = {};

                dataInit();


                /////////////////////////////// DATA INITIALIZATION ////////////////////////////////////////////
                function dataInit() {
                    populateUser();
                }


                /////////////////////////////// SERVICE CALLS ///////////////////////////////////////////////////
                $scope.logout = function () {
                    loginService.logout();
                };

                $scope.checkLoginStatus = function () {
                    loginService.checkLoginStatus();
                };

                // populate user object from JS session
                function populateUser() {
                    $scope.user.Username = sessionService.get("Username");
                    $scope.user.FirstName = sessionService.get("FirstName");
                    $scope.user.LastName = sessionService.get("LastName");
                }


                /////////////////////////////// HELPER METHODS //////////////////////////////////////////////////


            }]);
    myapp.controller('myctrl', function ($scope) {


        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line',
                    zoomType: 'x'
                }
            },
            title: {
                text: 'Store Rating',
                x: -20 //center
            },
            subtitle: {
                text: 'Per last 10 days',
                x: -20
            },
            xAxis: {
                categories: ['10 days ago', '9 days ago', '8 days ago', '7 days ago', '6 days ago', '5 days ago',
                    '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today']
            },
            yAxis: {
                title: {
                    text: 'Rating'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '/5'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Maceys',
                data: [4.0, 3.0, 4.0, 2.0, 2.5, 1.5, 3.5, 3.5, 4.5, 3]
            }, {
                name: 'Smiths Marketplace',
                data: [4.5, 5.0, 4.0 , 4.0, 4.5, 2.0, 4.5, 5, 4.0,4.0]
            }, {
                name: 'Walmart Supercenter',
                data: [4.5, 3.5, 3.5, 2.5, 3.5, 4, 4, 3.5, 3.0, 4.0]
            }, {
                name: 'Smiths Groceries',
                data: [3.4, 4.0, 4.5, 3.5, 3.0, 3.5, 3.0, 3.0, 2.0, 1.0]
            }]
        }

    });





})();

