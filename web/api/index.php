<?php

require '../../vendor/autoload.php';
require 'includes/init.php';

\Slim\Slim::registerAutoloader();

// LOGIN ROUTES
$app->group('/user/', function() use ($app) {
    $app->get('get/', 'getUser');
//    $app->post('login/', 'login');
//    $app->get('logout/', 'logout');
    $app->post('create/', function() use ($app) {
        $user = json_decode($app->request->getBody());
        createUser($user);
    });
});

// TEST ROUTES
$app->group('/test/', function() use ($app) {
    $app->post('test1/', function() use ($app) {
        $data = json_decode($app->request->getBody());
        test1($data);
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