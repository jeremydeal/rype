<?php

// GET /api/user/getUser/
function getUser($request, $response, $args) {
    // generate session
    // session_cache_limiter so that PHP will not contradict Slim's cache expiration headers
    session_cache_limiter(false);
    session_start();

    $user = null;

    if (isset($_SESSION['UserId'])) {

        // grab auth info from DB
        $sql = "SELECT u.*
                  FROM user AS u
                  WHERE u.UserId = :userId";
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("userId", $_SESSION['UserId']);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_OBJ);
            $db = null;
        } catch (PDOException $e) {
            // if DB error, leave $user null
        }

        // if no session var, leave $user null
    }

    $response->write('{"user": ' . json_encode($user) . '}');
}


// POST /api/user/login/
function createUser($request, $response, $args)
{
    // grab $_POST data
    $postData = $request->getParsedBody();

    // hash the pass
    $hashedPass = password_hash($postData["Password"], PASSWORD_DEFAULT);

    // store the new user in the DB
    $sql = "INSERT INTO user (
                      Email,
                      Password,
                      FirstName,
                      LastName
                    ) VALUES (
                      :email,
                      :password,
                      :firstName,
                      :lastName
                    )";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $postData['Email']);
        $stmt->bindParam("password", $hashedPass);
        $stmt->bindParam("firstName", $postData['FirstName']);
        $stmt->bindParam("lastName", $postData['LastName']);
        $stmt->execute();
        $db = null;

        $response->write('{"message": "success"}');
    } catch(PDOException $e) {
        $response->write('{"message": "failure"}');
    }
}
