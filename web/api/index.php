<?php

require '../../vendor/autoload.php';
require 'includes/init.php';

$app = new Slim\App();

// PRODUCE ROUTES
$app->group('/produce/', function() use ($app) {
    $app->get('', 'getProduce');
    $app->get('byId/{produceId}', 'getProduceById');
    $app->get('byType/{produceTypeId}', 'getProduceByType');
});

// PRODUCE TYPE ROUTES
$app->group('/produceType/', function() use ($app) {
    $app->get('', 'getProduceType');
    $app->get('byId/{produceTypeId}', 'getProduceTypeById');
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