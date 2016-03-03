<?php

// GET /api/user/getUser/
function getUsers() {

    $users = null;

    $sql = "SELECT * FROM customer";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
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

    if (isset($_SESSION['uid'])) {

        // grab auth info from DB
        $sql = "SELECT *
                  FROM customer
                  WHERE CustomerId = :customerId";
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("customerId", $_SESSION['uid']);
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

// GET /user/check/
function check() {
    session_cache_limiter(false);
    session_start();
    if (isset($_SESSION['uid'])) {
        print 'authenticated';
    }
}


// POST /user/login/
function login($user) {
    if ($user->Username && $user->Password) {

        // authenticate user in database
        $sql = "SELECT CustomerId, Username, Password, FirstName, LastName
                  FROM customer
                  WHERE Username = :username";
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("username", $user->Username);
            $stmt->execute();
            $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
            $db = null;

            // create and return the session
            if (isset($dbUser) && isset($dbUser->Password)) {
                // we found a customer matching that username; authenticate the password
                if (password_verify($user->Password, $dbUser->Password)) {
                    {
                        // set the session
                        session_cache_limiter(false);
                        session_start();
                        $_SESSION['uid'] = $dbUser->CustomerId;

                        // return the user object
                        print '{"user": ' . json_encode($dbUser) . '}';
                    }
                }
            }
        }
        catch (PDOException $e) {
            // DB access error; do not create a session
        }
    }
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

    echo 'logged out!';
}


// POST /api/user/create/
function createUser($user) {
    // hash the pass
    $hashedPass = password_hash($user->Password, PASSWORD_DEFAULT);

    // store the new user in the DB
    $sql = "INSERT INTO customer (
                      Username,
                      Password,
                      FirstName,
                      LastName,
                      Email
                    ) VALUES (
                      :username,
                      :password,
                      :firstName,
                      :lastName,
                      :email
                    )";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("username", $user->Username);
        $stmt->bindParam("password", $hashedPass);
        $stmt->bindParam("firstName", $user->FirstName);
        $stmt->bindParam("lastName", $user->LastName);
        $stmt->bindParam("email", $user->Email);

        // if INSERT succeeds, grab return the entered user and login
        if ($stmt->execute() && $stmt->rowCount() > 0) {

            $id = $db->lastInsertId();

            // authenticate user in database
            $sql = "SELECT CustomerId, Username, Password, FirstName, LastName
                  FROM customer
                  WHERE CustomerId = :id";
            try {
                $db = getDB();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("id", $id);
                $stmt->execute();
                $dbUser = $stmt->fetch(PDO::FETCH_OBJ);

                // create and return the session
                if (isset($dbUser)) {
                    // set the session
                    session_cache_limiter(false);
                    session_start();
                    $_SESSION['uid'] = $dbUser->CustomerId;

                    // return the user object
                    print '{"user": ' . json_encode($dbUser) . '}';
                }
            }
            catch (PDOException $e) {
                // DB access error; do not create a session
            }


            print 'user created';
        }

        $db = null;

    } catch(PDOException $e) {
        // DB access error; return nothing
    }
}
