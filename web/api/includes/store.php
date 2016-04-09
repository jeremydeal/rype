<?php

// GET /api/store/
// This will return all the data we have about each store, as well as an average store rating
// calculated by aggregating data from the StoreRatings and ProduceRatings tables.
function getStores()
{
    // grab stores from DB
    $sql = "SELECT *
	          FROM store";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stores = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we get back at least one store,
        // iterate through the stores and add ratings
        if ($stmt->rowCount() > 0) {
            $stores = calculateStoreRatings($stores);
        }

        $db = null;
        echo '{"stores": ' . json_encode($stores) . '}';
    } catch(PDOException $e) {
        echo '{"error": { "text": ' . $e->getMessage() . '} }';
    }
}


// GET /api/store/byId/1
// This will return all the data we have about each store, as well as an average store rating
// calculated by aggregating data from the StoreRatings and ProduceRatings tables. This function also
// returns historical ratings for the last ten days as the attributes RatingsTMinus1, RatingsTMinus2, etc.
function getStoreById($storeId)
{
    // grab store from DB
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

        // if we get back at least a store,
        // add rating
        if ($stmt->rowCount() > 0) {
            $store = calculateStoreRating($store);
            $store = calculateHistoricalRatings($store, 10);
        }

        $db = null;
        echo '{"store": ' . json_encode($store) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}
