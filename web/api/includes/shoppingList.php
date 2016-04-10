<?php

// GET /api/produce/byShoppingList/1
function getShoppingList($customerId)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID
                JOIN shoppingList AS sl ON p.ProduceID = sl.ProduceID
                WHERE s1.CustomerId = :customerId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("customerId", $customerId);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);

        $db = null;
        echo '{"products": ' . json_encode($products) . '}';

    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/addToShoppingList/1/2
function addToShoppingList($customerId, $produceId)
{
    $sql = "INSERT INTO shoppingList (ProduceId, CustomerId)
                VALUES (:produceId, :customerId)";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("customerId", $customerId);
        $stmt->bindParam("produceId", $produceId);

        if ($stmt->execute() && $stmt->rowCount() > 0) {
            echo "success";
        } else {
            echo "failure";
        }

        $db = null;

    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/produce/removeFromShoppingList/1/2
function removeFromShoppingList($customerId, $produceId)
{
    $sql = "DELETE FROM shoppingList
                WHERE ProduceId = :produceId AND CustomerId = :customerId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("customerId", $customerId);
        $stmt->bindParam("produceId", $produceId);

        if ($stmt->execute() && $stmt->rowCount() > 0) {
            echo "success";
        } else {
            echo "failure";
        }

        $db = null;

    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}
