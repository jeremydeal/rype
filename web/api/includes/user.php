<?php

// POST /api/user/login/
function login($request, $response, $args)
{
    // grab auth info from DB
    $user = null;

    $sql = "SELECT u.*
              FROM user AS u
              WHERE u.Email = :email";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $request->params('Email'));
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
    } catch(PDOException $e) {
        // leave $outputData null
    }

    // check auth info against DB values
    $salt = $user->salt;
    $saltedPass =  $request->params('Password') . $salt;
    $hashedPass = hash('sha256', $saltedPass);
    if ($user != null && $hashedPass == $user->Password)
    {
        // successful login

    }
    else {
        // failed login

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
    // generate random salt
    $salt = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM));

    // hash the password
    $saltedPass =  $request->params('Password') . $salt;
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
        $stmt->bindParam("email", $request->params('Email'));
        $stmt->bindParam("password", $hashedPass);
        $stmt->bindParam("salt", $salt);
        $stmt->bindParam("firstName", $request->params('FirstName'));
        $stmt->bindParam("lastName", $request->params('LastName'));
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        return $response->write('{"error: { "text": ' . $e->getMessage() . '} }');
    }
}

