<?php

// GET /api/produce/
function getProduce()
{
    $sql = "SELECT p.*, pt.*, nv.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
                JOIN nutritionValue AS nv ON p.produceTypeID = nv.produceTypeID";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"products": ' . json_encode($products) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/byId/1
function getProduceById($produceId)
{
    $sql = "SELECT p.*, pt.*, nv.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
                JOIN nutritionValue AS nv ON p.produceTypeID = nv.produceTypeID
                WHERE p.produceId = :produceId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceId", $produceId);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo '{"product": ' . json_encode($product) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/byType/1
function getProduceByType($typeId)
{
    $sql = "SELECT p.*, pt.*, nv.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
                JOIN nutritionValue AS nv ON p.produceTypeID = nv.produceTypeID
                WHERE p.produceTypeId = :produceTypeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("produceTypeId", $typeId);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"products": ' . json_encode($products) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}