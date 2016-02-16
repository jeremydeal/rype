<?php

function getProduce()
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID";
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

function getProduceById($produceId)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
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