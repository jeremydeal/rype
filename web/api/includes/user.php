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
            // leave $user null
        }
    }

    $response->write('{"user": ' . json_encode($user) . '}');
}

// POST /api/user/login/
function login($request, $response, $args)
{
    // grab $_POST data
    $postData = $request->getParsedBody();

    // grab auth info from DB
    $user = null;

    $sql = "SELECT u.*
              FROM user AS u
              WHERE u.Email = :email";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $postData['Email']);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
    } catch(PDOException $e) {
        // leave $user null
    }

    // check auth info against DB values
    $salt = $user->Salt;
    $saltedPass =  $postData['Password'] . $salt;
    $hashedPass = hash('sha256', $saltedPass);
    if ($user != null && $hashedPass == $user->Password)
    {
        // successful login; generate session
        // session_cache_limiter so that PHP will not contradict Slim's cache expiration headers
        session_cache_limiter(false);
        session_start();
        $_SESSION['UserId'] = $user->UserId;
        $_SESSION['Email'] = $user->Email;
        $_SESSION['FirstName'] = $user->FirstName;
        $_SESSION['LastName'] = $user->LastName;

        // return success code
        $response->write('{"message": "success"}');
    }
    else {
        // failed login; return failure code
        $response->write('{"message": "failure"}');
    }
}


function logout($request, $response, $args) {
    // session_cache_limiter so that PHP will not contradict Slim's cache expiration headers
    session_cache_limiter(false);
    session_start();

    // Unset session variables.
    $_SESSION = array();

    // Delete the session cookie.
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // And destroy the session.
    session_destroy();

    $response->write("success");
}


// POST /api/user/login/
function createUser($request, $response, $args)
{
    // grab $_POST data
    $postData = $request->getParsedBody();
    $response->write(json_encode($postData));

//    // generate random salt
//    $salt = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));
//
//    // hash the password
//    $saltedPass =  $postData['Password'] . $salt;
//    $hashedPass = hash('sha256', $saltedPass);
//
//    // store the new user in the DB
//    $sql = "INSERT INTO user (
//  Email,
//  Password,
//  Salt,
//  FirstName,
//  LastName
//)
//VALUES (
//  :email,
//  :password,
//  :salt,
//  :firstName,
//  :lastName
//)";
//
//    try {
//        $db = getDB();
//        $stmt = $db->prepare($sql);
//        $stmt->bindParam("email", $postData['Email']);
//        $stmt->bindParam("password", $hashedPass);
//        $stmt->bindParam("salt", $salt);
//        $stmt->bindParam("firstName", $postData['FirstName']);
//        $stmt->bindParam("lastName", $postData['LastName']);
//        $stmt->execute();
//        $db = null;
//
//        $response->write('{"message": "success"}');
//    } catch(PDOException $e) {
//        $response->write('{"message": "failure"}');
//    }
}
