<?php
echo '
<!DOCTYPE html>
<html lang="en" ng-app="myApp" class="no-js">
<head>
    <meta charset="utf-8">
    <title>My AngularJS App</title>
    <meta name="description" content="" />

    <!-- BOOTSTRAP LINKS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="app.css" />
</head>

<body class="container-fluid">

    <div class="navbar">
        <ul class="nav nav-pills">
            <li><a class="active" href="#/test1">Home</a></li>
            <li><a href="#/produce">Produce</a></li>
            <li><a href="#/test1">Grocery Store</a></li>
            <form class="navbar-form navbar-right" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search Produce">
                </div>
                <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
            </form>
        </ul>
    </div>

    <div ng-view></div>

    <!-- APPLICATION DEPENDENCY SCRIPTS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-ui/ui-bootstrap-tpls-0.14.3.min.js"></script>-->
    <script src="app.js"></script>

    <!-- CONTROLLERS -->
    <script src="produce/produce.js"></script>
    <script src="test/test1.js"></script>

    <!-- FILTERS -->
    <!--<script src="payroll/payrollFilters.js"></script>-->

    <!-- APP-WIDE SERVICES -->
    <script src="services/produceService.js"></script>

</body>
</html>
';