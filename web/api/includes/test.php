<?php

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

// POST /api/test/test1/
function test1(ServerRequestInterface $request, ResponseInterface $response) {
    $data = $request->getParsedBody();
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->getBody()->write(json_encode($data));
}