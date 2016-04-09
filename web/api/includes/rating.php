<?php

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
            echo 'Insert successful.';
        }

        $db = null;

    } catch(PDOException $e) {
        // DB access error; return nothing
    }
}


// POST /api/store/rate/
// This function adds a new store-wide rating.
function rateProduce($data) {
    // store the new user in the DB
    $sql = "INSERT INTO ProduceRating (
                      Rating,
                      DateTime,
                      CustomerId,
                      StoreId,
                      ProduceId
                    ) VALUES (
                      :rating,
                      NOW(),
                      :customerId,
                      :storeId,
                      :produceId
                    )";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("rating", $data->Rating);
        $stmt->bindParam("customerId", $data->CustomerId);
        $stmt->bindParam("storeId", $data->StoreId);
        $stmt->bindParam("produceId", $data->ProduceId);

        // if INSERT succeeds, grab return the entered user and login
        if ($stmt->execute() && $stmt->rowCount() > 0) {
            echo 'Insert successful.';
        }

        $db = null;

    } catch(PDOException $e) {
        // DB access error; return nothing
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This function takes a list of stores, calculates average store-wide ratings for those stores
// (weighted by how old the rating is), adds those ratings to each store as $store->Rating,
// and returns the list of stores.
function calculateStoreRatings($stores)
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
                $store->Rating = getAverageStoreRating($ratings, $store->StoreId);
            }
        }

        return $stores;

    } catch (PDOException $e) {
        return "";
    }
}

// This function takes a single store, calculates average store-wide rating, adds the rating
// as $store->Rating, and returns the store.
function calculateStoreRating($store)
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
            $store->Rating = getAverageStoreRating($ratings, $store->StoreId);
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
                $tempRatings = getDecrementedRatings($ratings);

                // and add historical rating to store object
                $store->{"RatingTMinus" . $i} = getAverageStoreRating($tempRatings, $store->StoreId);
            }
        }

        return $store;

    } catch (PDOException $e) {
        return "";
    }
}


// This function decrements the datediffs for each rating passed in
// and returns a new list of ratings. Note: this does not remove dates
// that have not passed, because those dates are already handled
// by getAverageRatingForStore().
function getDecrementedRatings($ratings) {
    // decrement the datediffs for each rating
    $tempRatings = $ratings;
    foreach ($tempRatings as $rating) {
        $rating->DateDiff = intval($rating->DateDiff) - 1;
    }

    return $tempRatings;
}


// This function takes a list of products at specific stores, calculates average ratings for each product
// (weighted by how old the rating is), adds those ratings to each product as $product->Rating,
// and returns the list of stores.
function calculateProduceRatings($products, $storeId)
{
    // pull all store-wide ratings from DB
    $sql = "SELECT ProduceId, Rating, DATEDIFF(NOW(), DateTime) AS DateDiff
                  FROM produceRating
                  WHERE StoreId = :storeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("storeId", $storeId);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {

            // add ratings to each store object
            foreach ($products as $product) {
                $product->Rating = getAverageProduceRating($ratings, $product->ProduceId);
            }
        }

        return $products;

    } catch (PDOException $e) {
        return "";
    }
}


// This function calculates an average rating for a given store.
function getAverageStoreRating($ratings, $storeId) {
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

// This function calculates an average rating for a given product.
function getAverageProduceRating($ratings, $produceId) {
    // These are the weights we apply, based on how old each rating is.
    $MULTIPLIERS = array("week"=>1.0,"month"=>0.7,"season"=>0.4,"year"=>0.2, "none"=>0.0);

    $totalRating = 0.0;
    $totalPossible = 0.0;

    // get only the ratings for this store, with valid timestamps
    foreach ($ratings as $rating) {
        if ($rating->DateDiff !== null && $rating->Rating !== null
            && $rating->ProduceId == $produceId) {

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