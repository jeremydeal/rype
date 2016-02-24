<?php

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
        $stmt->bindParam("email", $postData->Email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
    } catch(PDOException $e) {
        // leave $outputData null
    }

    // check auth info against DB values
    $salt = $user->Salt;
    $saltedPass =  $postData->Password . $salt;
    $hashedPass = hash('sha256', $saltedPass);
    if ($user != null && $hashedPass == $user->Password)
    {
        // successful login; generate session
        session_start();
        $_SESSION['UserId'] = $user->UserId;
        $_SESSION['Email'] = $user->Email;
        $_SESSION['FirstName'] = $user->FirstName;
        $_SESSION['LastName'] = $user->LastName;

        // return success code
        $response->write(json_encode('{"message": "success"}'));
    }
    else {
        // failed login; return failure code
        $response->write(json_encode('{"message": "failure"}'));
    }
}


function logout($request, $response, $args) {
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
}


// POST /api/user/login/
function createUser($request, $response, $args)
{
    // grab $_POST data
    $postData = $request->getParsedBody();

    // generate random salt
    $salt = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));

    // hash the password
    $saltedPass =  $postData->Password . $salt;
    $hashedPass = hash('sha256', $saltedPass);

    // store the new user in the DB
    $sql = "INSERT INTO user (
  Email,
  Password,
  Salt,
  FirstName,
  LastName
)
VALUES (
  :email,
  :password,
  :salt,
  :firstName,
  :lastName
)";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $postData->Email);
        $stmt->bindParam("password", $hashedPass);
        $stmt->bindParam("salt", $salt);
        $stmt->bindParam("firstName", $postData->FirstName);
        $stmt->bindParam("lastName", $postData->LastName);
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        $response->write('{"error: { "text": ' . $e->getMessage() . '} }');
    }
}
