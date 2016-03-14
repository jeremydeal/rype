<?php

require '../../vendor/autoload.php';
require 'includes/init.php';

$app = new \Slim\Slim();

// LOGIN ROUTES
$app->group('/user/', function() use ($app) {
//    $app->get('', 'getUsers');
//    $app->get('getCurrent/', 'getCurrentUser');
    $app->post('login/', function() use ($app) {
        $user = json_decode($app->request->getBody());
        login($user);
    });
    $app->get('logout/', 'logout');
    $app->get('check/', 'check');
    $app->post('create/', function() use ($app) {
        $user = json_decode($app->request->getBody());
        createUser($user);
    });
});

// PRODUCE ROUTES
$app->group('/produce/', function() use ($app) {
    $app->get('', 'getProduce');
    $app->get('byId/:produceId', 'getProduceById');
    $app->get('byType/:produceTypeId', 'getProduceByType');
});

// PRODUCE TYPE ROUTES
$app->group('/produceType/', function() use ($app) {
    $app->get('', 'getProduceTypes');
    $app->get('byId/:produceTypeId', 'getProduceTypeById');
});

// PRODUCE CLASS ROUTES
$app->group('/produceClass/', function() use ($app) {
    $app->get('', 'getProduceClasses');
});

// STORE ROUTES
$app->group('/store/', function() use ($app) {
    $app->get('', 'getStores');
    $app->get('byId/:storeId', 'getStoreById');
});


$app->run();


//// TEST ROUTES
//$app->get('/', function ($request, $response, $args) {
//    $response->write("Welcome to Slim!");
//    return $response;
//});
//$app->get('/hello[/{name}]', function ($request, $response, $args) {
//    $response->write("Hello, " . $args['name']);
//    return $response;
//})->setArgument('name', 'World!');

//    $app->post('/create', function() use ($app) {
//        $u = json_decode($app->request()->getBody());
//        createUser($u);
//    });