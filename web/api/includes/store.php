<?php

// GET /api/store/
function getStores()
{
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

function calculateRatings($stores)
{
    $sql = "SELECT sr.StoreId, sr.Rating, DATEDIFF(NOW(), sr.DateTime) AS DateDiff
                  FROM storeRating AS sr";
    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $stmt->execute();
        $ratings = $stmt->fetchAll(PDO::FETCH_OBJ);

        // if we succeeded in pulling ratings...
        if ($stmt->rowCount() > 0) {
            foreach ($stores as $store) {
                $storeId = $store->StoreId;

                $MULTIPLIERS = array(1=>1.0,2=>0.7,3=>0.4,4=>0.2, 5=>0.0);

                $totalRating = 0.0;
                $totalPossible = 0.0;

                // get only the ratings for this store
                foreach ($ratings as $rating) {
                    if ($rating->StoreId == $storeId) {

                        $rate = intval($rating->Rating);
                        $dd = intval($rating->DateDiff);

                        // if the rating pertains to this store,
                        // figure out the multiplier based on how old the rating is...
                        if ($dd <= 7) {
                            $multiplierCode = 1;
                        } else if ($dd <= 30) {
                            $multiplierCode = 2;
                        } else if ($dd <= 90) {
                            $multiplierCode = 3;
                        } else if ($dd <= 365) {
                            $multiplierCode = 4;
                        } else {
                            $multiplierCode = 5;
                        }

                        $multiplier = $MULTIPLIERS[$multiplierCode];

                        // ...and add it to our current total rating
                        $totalRating += $rate * $multiplier;
                        $totalPossible += 5.0 * $multiplier;
                    }
                }

                // set store rating
                $avgRating = round($totalRating / $totalPossible, 2);
                $store->Rating = $avgRating;
            }
        }

        return $stores;

    } catch (PDOException $e) {
        return "";
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

<<<<<<< HEAD

=======
>>>>>>> 424ff609586ee539c819bb69f9ecae079a98af2a
