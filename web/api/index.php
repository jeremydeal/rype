<?php

require '../../vendor/autoload.php';
require 'includes/init.php';

$app = new \Slim\Slim();

// USER ROUTES
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
    $app->post('setPreferredStore/', function() use ($app) {
        $user = json_decode($app->request->getBody());
        setPreferredStore($user);
    });
});

// PRODUCE ROUTES
$app->group('/produce/', function() use ($app) {
    $app->get('', 'getProduce');
    $app->get('byId/:produceId', 'getProduceById');
    $app->get('byType/:produceTypeId', 'getProduceByType');
    $app->get('byStore/:storeId', 'getProduceByStore');
    $app->get('getShoppingList/:customerId', 'getShoppingList');
    $app->get('addToShoppingList/:customerId/:produceId', 'addToShoppingList');
    $app->get('removeFromShoppingList/:customerId/:produceId', 'removeFromShoppingList');
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
    $app->post('rate/', function() use ($app) {
        $data = json_decode($app->request->getBody());
        rateStore($data);
    });
});

// RATING ROUTES
$app->group('/rating/', function() use ($app) {
    $app->post('byStore/', function() use ($app) {
        $data = json_decode($app->request->getBody());
        rateStore($data);
    });
    $app->post('byProduce/', function() use ($app) {
        $data = json_decode($app->request->getBody());
        rateProduce($data);
    });
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