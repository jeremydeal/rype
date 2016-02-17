<!DOCTYPE html>
<html lang="en" ng-app="myApp" class="no-js">
<head>
    <meta charset="utf-8">
    <title>My AngularJS App</title>
    <meta name="description" content="">
    <link rel="stylesheet" href="app.css">
</head>
<body class="container-fluid">

    <div class="navbar">
        <ul class="nav nav-pills">
            <li><a href="#/produce">Produce</a></li>
            <li><a href="#/test1">TEST 1</a></li>
            <li><a href="#/test2">TEST 2</a></li>
        </ul>
    </div>

    <div ng-view></div>

    <!-- ANGULAR SCRIPTS CALLS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-ui/ui-bootstrap-tpls-0.14.3.min.js"></script>-->
    <script src="app.js"></script>

    <!-- CONTROLLERS -->
    <!--<script src="personal/personal.js"></script>-->

    <!-- FILTERS -->
    <!--<script src="payroll/payrollFilters.js"></script>-->

    <!-- APP-WIDE SERVICES -->
    <!--<script src="../services/usersService.js"></script>-->

</body>
</html>