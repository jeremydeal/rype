<?php

// GET /api/user/getUser/
function getUsers() {

    $users = null;

    $sql = "SELECT u.*
                  FROM user AS u";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("userId", $_SESSION['UserId']);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
    } catch (PDOException $e) {
        // if DB error, leave $user null
    }

    echo '{"users": ' . json_encode($users) . '}';
}


// GET /api/user/getUser/
function getCurrentUser() {
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

    echo '{"user": ' . json_encode($user) . '}';
}


// POST /user/login/
function login($user) {
    // grab auth info from DB
    $dbUser = null;

    $sql = "SELECT *
          FROM user
          WHERE user.Email = :email";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $user->Email);
        $stmt->execute();
        $dbUsers = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbUser = $dbUsers[0];
        $db = null;

        // check auth info against DB values
        if ($user != null && password_verify($user->Password, $dbUser->Password))
        {
            // successful login; generate session
            session_start();
            $_SESSION['UserId'] = $dbUser->UserId;
        }
        else {
            // failed login; return null user
            $dbUser = null;
        }
    }
    catch(PDOException $e) {
        // leave $user null
    }

    echo '{"user": ' . json_encode($dbUser) . '}';
}


// POST /user/logout/
function logout() {

    // Unset session variables.
    session_cache_limiter(false);
    session_start();
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

    echo '{"message": "success"}';
}


// POST /api/user/login/
function createUser($user) {
    // hash the pass
    $hashedPass = password_hash($user->Password, PASSWORD_DEFAULT);

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
        $stmt->bindParam("email", $user->Email);
        $stmt->bindParam("password", $hashedPass);
        $stmt->bindParam("firstName", $user->FirstName);
        $stmt->bindParam("lastName", $user->LastName);
        $stmt->execute();

        // if successful, log in
        if ($db->lastInsertId() > -1) {
            session_start();
            $_SESSION['UserId'] = $db->lastInsertId();
        }

        $db = null;

        echo '{"message": "success"}';
    } catch(PDOException $e) {
        echo '{"message": "failure"}';
    }
}
