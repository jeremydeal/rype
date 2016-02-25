<?php

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

// POST /api/test/test1/
function test1(ServerRequestInterface $request, ResponseInterface $response) {
    $data = $request->getParsedBody();
    $response->getBody()->write(json_encode($data));
    return $response;
}