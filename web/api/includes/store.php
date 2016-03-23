<?php

// GET /api/store/
function getStores()
{
    $sql = "SELECT s.*,avg(sr.Rating) AS Rating
	          FROM store AS s
              JOIN storerating AS sr  ON s.storeId = sr.storeid
            GROUP BY s.StoreId
            ORDER BY Rating DESC";
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
    $sql = "SELECT s.*,avg(sr.Rating) AS Rating
	          FROM store AS s
              JOIN storerating AS sr  ON s.storeId = sr.storeid
              WHERE s.StoreId = :storeId
            GROUP BY s.StoreId";
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

// POST /api/store/rate/
function rateStore($rating) {
    // store the new user in the DB
    $sql = "INSERT INTO storerating (
                      Rating,
                      DateTime,
                      CustomerId,
                      StoreId
                    ) VALUES (
                      :storeRatingId,
                      :rating,
                      NOW(),
                      :customerId,
                      :storeId
                    )";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("rating", $rating->Rating);
        $stmt->bindParam("customerId", $rating->CustomerId);
        $stmt->bindParam("storeId", $rating->StoreId);

        // if INSERT succeeds, grab return the entered user and login
        if ($stmt->execute() && $stmt->rowCount() > 0) {

            $id = $db->lastInsertId();
            echo 'Insert successful.';
        }

        $db = null;

    } catch(PDOException $e) {
        // DB access error; return nothing
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