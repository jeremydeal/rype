<?php

require '../vendor/autoload.php';
require 'includes/init.php';

$app = new Slim\App();

//// USER ROUTES
//$app->group('/users', function() use ($app) {
//    $app->get('/', 'getUsers');
//    $app->get('/bySite/:siteId', 'getUsersBySite');
//    $app->get('/byPrimarySite/:siteId', 'getUsersByPrimarySite');
//    $app->get('/bySecondarySite/:siteId', 'getUsersBySecondarySite');
//    $app->get('/byPrimaryAndSecondarySite/:siteId', 'getUsersByPrimaryAndSecondarySite');
//    $app->get('/admins', 'getAdmins');
//    $app->get('/supervisors', 'getSupervisors');
//    $app->get('/byId/:userId', 'getUserById');
//    $app->post('/create', function() use ($app) {
//        $u = json_decode($app->request()->getBody());
//        createUser($u);
//    });
//    $app->post('/update', function() use ($app) {
//        $u = json_decode($app->request()->getBody());
//        updateUser($u);
//    });
//    $app->post('/delete', function() use ($app) {
//        $u = json_decode($app->request()->getBody());
//        deleteUser($u);
//    });
//});

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

$app->run();

?>


<h1>Hello Jeremy!</h1>

<h2>Hello Kameron</h2>

<h3>Kamerino el bambino el muchaho mas fino!</h3>

<h4>Hello Annie!</h4>
