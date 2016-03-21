<?php

// GET /api/store/
function getStores()
{
    $sql = "SELECT s.*,avg(sr.Rating) AS rating
	          FROM store AS s
              JOIN storerating AS sr  ON s.storeId = sr.storeid
            GROUP BY s.StoreId;";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stores = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"stores": ' . json_encode($stores) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}

// GET /api/store/byId/1
function getStoreById($storeId)
{
    $sql = "SELECT s.*,avg(sr.Rating) AS rating
	          FROM store AS s
              JOIN storerating AS sr  ON s.storeId = sr.storeid
            GROUP BY s.StoreId
            WHERE s.StoreId = :storeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("storeId", $storeId);
        $stmt->execute();
        $store = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo '{"product": ' . json_encode($store) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}


//// GET /api/produce/byType/1
//function getProduceByType($typeId)
//{
//    $sql = "SELECT p.*, pt.*
//              FROM produce AS p
//                JOIN produceType AS pt ON p.produceTypeID = pt.produceTypeID
//                WHERE p.produceTypeId = :produceTypeId";
//    try {
//        $db = getDB();
//        $stmt = $db->prepare($sql);
//        $stmt->bindParam("produceTypeId", $typeId);
//        $stmt->execute();
//        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
//        $db = null;
//        echo '{"products": ' . json_encode($products) . '}';
//    } catch (PDOException $e) {
//        echo '{"error: { "text": ' . $e->getMessage() . '} }';
//    }
//}