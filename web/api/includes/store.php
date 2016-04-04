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
            $stores = calculateRatings($stores);
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
            $store = calculateRating($store);
            $store = calculateHistoricalRatings($store, 10);
        }

        $db = null;
        echo '{"product": ' . json_encode($store) . '}';
    } catch (PDOException $e) {
        echo '{"error: { "text": ' . $e->getMessage() . '} }';
    }
}


// POST /api/store/rate/
// This function adds a new store-wide rating.
function rateStore($data) {
    // store the new user in the DB
    $sql = "INSERT INTO StoreRating (
                      Rating,
                      DateTime,
                      CustomerId,
                      StoreId
                    ) VALUES (
                      :rating,
                      NOW(),
                      :customerId,
                      :storeId
                    )";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("rating", $data->Rating);
        $stmt->bindParam("customerId", $data->CustomerId);
        $stmt->bindParam("storeId", $data->StoreId);

        // if INSERT succeeds, grab return the entered user and login
        if ($stmt->execute() && $stmt->rowCount() > 0) {

//            $id = $db->lastInsertId();
            echo 'Insert successful.';
        }

        $db = null;

    } catch(PDOException $e) {
        // DB access error; return nothing
    }
}


// This function takes a list of stores, calculates average store-wide ratings for those stores
// (weighted by how old the rating is), adds those ratings to each store as $store->Rating,
// and returns the list of stores.
function calculateRatings($stores)
{
    // pull all store-wide ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {

            // add ratings to each store object
            foreach ($stores as $store) {
                $store->Rating = getAverageRatingForStore($ratings, $store->StoreId);
            }
        }

        return $stores;

    } catch (PDOException $e) {
        return "";
    }
}

// This function takes a single store, calculates average store-wide rating, adds the rating
// as $store->Rating, and returns the store.
function calculateRating($store)
{
    // grab ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {
            // ...add rating to store object
            $store->Rating = getAverageRatingForStore($ratings, $store->StoreId);
        }

        return $store;

    } catch (PDOException $e) {
        return "";
    }
}


// This function takes a single store, calculates historical ratings for a given number of
// days into the past, stores those ratings as $store->RatingTMinus1, $store->RatingTMinus2, etc.,
// and returns the store object.
function calculateHistoricalRatings($store, $numDays)
{
    // grab ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {
            for ($i = 1; $i <= $numDays; $i++) {
                // decrement age of all ratings by desired number
                $tempRatings = getDecrementedRatings($ratings, $i);

                // and add historical rating to store object
                $store->{"RatingTMinus" . $i} = getAverageRatingForStore($tempRatings, $store->StoreId);
            }
        }

        return $store;

    } catch (PDOException $e) {
        return "";
    }
}


// TODO
function getDecrementedRatings($ratings, $decrementor) {
    // decrement the datediffs for each rating
    $tempRatings = $ratings;
    foreach ($tempRatings as $rating) {
        $rating->DateDiff = intval($rating->DateDiff) - $decrementor;
    }

    return $tempRatings;
}


// This function calculates an average rating for a given store.
function getAverageRatingForStore($ratings, $storeId) {
    // These are the weights we apply, based on how old each rating is.
    $MULTIPLIERS = array("week"=>1.0,"month"=>0.7,"season"=>0.4,"year"=>0.2, "none"=>0.0);

    $totalRating = 0.0;
    $totalPossible = 0.0;

    // get only the ratings for this store, with valid timestamps
    foreach ($ratings as $rating) {
        if ($rating->DateDiff !== null && $rating->Rating !== null
            && $rating->StoreId == $storeId) {

            $rate = floatval($rating->Rating);
            $dd = floatval($rating->DateDiff);

            // if the rating pertains to this store,
            // figure out the multiplier based on how old the rating is...
            if ($dd < 0) {
                $multiplierCode = "none";
            } else if ($dd <= 7) {
                $multiplierCode = "week";
            } else if ($dd <= 30) {
                $multiplierCode = "month";
            } else if ($dd <= 90) {
                $multiplierCode = "season";
            } else if ($dd <= 365) {
                $multiplierCode = "year";
            } else {
                $multiplierCode = "none";
            }

            $multiplier = $MULTIPLIERS[$multiplierCode];

            // ...and add it to our current total rating
            $totalRating += $rate * $multiplier;
            $totalPossible += $multiplier;
        }
    }

    // set store rating
    if ($totalPossible > 0) {
        $avgRating = round($totalRating / $totalPossible, 2);
    } else {
        $avgRating = "";
    }

    return $avgRating;
}

