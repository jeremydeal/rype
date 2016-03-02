<?php

require_once '../api/includes/db.php';

$user = json_decode(file_get_contents('php://input'));

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
        if (isset($dbUser) && isset($dbUser->Password))
        {
            // we found a customer matching that username; authenticate the password
            if ($user->Password == $dbUser->Password)
            {
//                session_start();
//                $_SESSION['uid'] = $dbUser->CustomerId;
                header('Content-type:application/json;charset=utf-8');
                print json_encode($dbUser);
            }
        }
    }
    catch (PDOException $e) {
        // DB access error; do not create a session
    }
}

//    // check auth info against DB values
////    if (password_verify($user->Password, $dbUser->Password)) {
//    if ($password == $dbUser->Password) {
//        // successful login; generate session
//        session_start();
//        $_SESSION['uid'] = $dbUser->UserId;
//        print $_SESSION['uid'];
//    }