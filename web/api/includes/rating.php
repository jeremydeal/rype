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
    $INCORPORATE_PRODUCE = false;

    // pull all store-wide ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $storeRatings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {

            // grab produce ratings from DB
            $sql = "SELECT pr.StoreId, pr.ProduceId, pr.Rating, DATEDIFF(NOW(), pr.DateTime) AS DateDiff
                  FROM produceRating AS pr";
            try {
                $db = getDB();
                $stmt = $db->query($sql);
                $stmt->execute();
                $produceRatings = $stmt->fetchAll(PDO::FETCH_OBJ);

                // if we succeeded in pulling ratings...
                if ($stmt->rowCount() > 0) {
                    $INCORPORATE_PRODUCE = true;
                }
            } catch (PDOException $e) {}


            // add ratings to each store object
            foreach ($stores as $store) {
                $storeRating = 0.0;
                $produceRating = 0.0;

                $storeRating = getAverageRatingByStore($storeRatings, $store->StoreId);
                if ($INCORPORATE_PRODUCE) {
                    $produceRating = getAverageRatingByStore($produceRatings, $store->StoreId);
                }

                $store->Rating = combineStoreAndProduceRatings($storeRating, $produceRating);
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
    // grab store ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr
                  WHERE sr.StoreId = :storeId";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("storeId", $store->StoreId);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {
            $storeRating = 0.0;
            $produceRating = 0.0;

            // calculate store rating
            $storeRating = getAverageRatingByStore($ratings, $store->StoreId);

            // grab produce ratings from DB
            $sql = "SELECT pr.StoreId, pr.ProduceId, pr.Rating, DATEDIFF(NOW(), pr.DateTime) AS DateDiff
                  FROM produceRating AS pr
                  WHERE pr.StoreId = :storeId";
            try {
                $db = getDB();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("storeId", $store->StoreId);
                $stmt->execute();
                $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

                // if we succeeded in pulling ratings...
                if ($stmt->rowCount() > 0) {
                    // ...add rating to store object
                    $produceRating = getAverageRatingByStore($ratings, $store->StoreId);
                }
            } catch (PDOException $e) {}

            // combine the two ratings and add to the store object
            $store->Rating = combineStoreAndProduceRatings($storeRating, $produceRating);
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
    $INCORPORATE_PRODUCE = false;

    // grab ratings from DB
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $storeRatings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {

            // grab produce ratings from DB
            $sql = "SELECT pr.StoreId, pr.ProduceId, pr.Rating, DATEDIFF(NOW(), pr.DateTime) AS DateDiff
                  FROM produceRating AS pr";
            try {
                $db = getDB();
                $stmt = $db->query($sql);
                $stmt->execute();
                $produceRatings = $stmt->fetchAll(PDO::FETCH_OBJ);

                // if we succeeded in pulling ratings...
                if ($stmt->rowCount() > 0) {
                    $INCORPORATE_PRODUCE = true;
                }
            } catch (PDOException $e) {}

            // get store ratings
            for ($i = 1; $i <= $numDays; $i++) {
                $storeRating = 0.0;
                $produceRating = 0.0;

                // decrement age of store ratings
                $tempStoreRatings = getDecrementedRatings($storeRatings);
                $storeRating = getAverageRatingByStore($tempStoreRatings, $store->StoreId);

                // decrement age of produce ratings
                if ($INCORPORATE_PRODUCE) {
                    $tempProduceRatings = getDecrementedRatings($produceRatings);
                    $produceRating = getAverageRatingByStore($tempProduceRatings, $store->StoreId);
                }

                // and add historical rating to store object
                $store->{"RatingTMinus" . $i} = combineStoreAndProduceRatings($storeRating, $produceRating);
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
                $product->Rating = getAverageRatingByProduct($ratings, $product->ProduceId);
            }
        }

        return $products;

    } catch (PDOException $e) {
        return "";
    }
}

// This function calculates an average rating for a given store.
function getAverageRatingByStore($ratings, $storeId) {
    $totalRating = 0.0;
    $totalPossible = 0.0;

    // get only the ratings for this store, with valid timestamps
    foreach ($ratings as $rating) {
        if ($rating->DateDiff !== null && $rating->Rating !== null
            && $rating->StoreId == $storeId) {

            $rate = floatval($rating->Rating);
            $dd = floatval($rating->DateDiff);

            $multiplier = getRatingMultiplier($dd);

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
function getAverageRatingByProduct($ratings, $produceId) {
    $totalRating = 0.0;
    $totalPossible = 0.0;

    // get only the ratings for this store, with valid timestamps
    foreach ($ratings as $rating) {
        if ($rating->DateDiff !== null && $rating->Rating !== null
            && $rating->ProduceId == $produceId) {

            $rate = floatval($rating->Rating);
            $dd = floatval($rating->DateDiff);

            $multiplier = getRatingMultiplier($dd);

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


function combineStoreAndProduceRatings($storeRating, $produceRating) {
    $rating = $storeRating;
    if ($produceRating > 0.0) {
        $rating = round($storeRating * 0.4 + $produceRating * 0.6, 2);
    }
    return $rating;
}


function getRatingMultiplier($dateDiff) {
    // These are the weights we apply, based on how old each rating is.
    $MULTIPLIERS = array("week"=>1.0,"month"=>0.7,"season"=>0.4,"year"=>0.2, "none"=>0.0);

    // if the rating pertains to this store,
    // figure out the multiplier based on how old the rating is...
    if ($dateDiff < 0) {
        $multiplierCode = "none";
    } else if ($dateDiff <= 7) {
        $multiplierCode = "week";
    } else if ($dateDiff <= 30) {
        $multiplierCode = "month";
    } else if ($dateDiff <= 90) {
        $multiplierCode = "season";
    } else if ($dateDiff <= 365) {
        $multiplierCode = "year";
    } else {
        $multiplierCode = "none";
    }

    return $MULTIPLIERS[$multiplierCode];
}