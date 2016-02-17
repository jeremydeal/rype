<?php

// GET /api/produce/
function getProduce($request, $response, $args)
{
    $sql = "SELECT p.produceId, p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"products": ' . json_encode($products) . '}');
    } catch(PDOException $e) {
        return $response->write('{"error": { "text": ' . $e->getMessage() . '} }');
    }
}

// GET /api/produce/byId/1
function getProduceById($request, $response, $args)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
                WHERE p.produceId = :produceId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceId", $args['produceId']);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"product": ' . json_encode($product) . '}');
    } catch (PDOException $e) {
        return $response->write('{"error: { "text": ' . $e->getMessage() . '} }');
    }
}

// GET /api/produce/byType/1
function getProduceByType($request, $response, $args)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
                WHERE p.produceTypeId = :produceTypeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceTypeId", $args['produceTypeId']);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $response->write('{"products": ' . json_encode($products) . '}');
    } catch (PDOException $e) {
        return $response->write('{"error: { "text": ' . $e->getMessage() . '} }');
    }
}