<?php

// GET /api/produce/byShoppingList/1
function getShoppingList($customerId)
{
    $sql = "SELECT p.*, pt.*
              FROM produce AS p
                JOIN produceType AS pt ON p.ProduceTypeID = pt.ProduceTypeID
                JOIN shoppingList AS sl ON p.ProduceID = sl.ProduceID";
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
