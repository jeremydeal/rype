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

        if (isset($dbUser))
        {
            // we found a customer matching that username; authenticate the password
            if (isset($dbUser->Password) && password_verify($dbUser->Password, $user->Password))
            {
                // create and return the session
                session_start();
                $_SESSION['uid'] = $dbUser->CustomerId;
                print '{"user": ' . json_encode($dbUser) . '}';
            }
            else {
                print "password lookup failed";
            }
        }
        else
        {
            print "no user was returned )-:";
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