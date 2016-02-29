<?php

require_once '../api/includes/db.php';

$user = json_decode(file_get_contents('php://input'));

if ($user->Username && $user->Password) {

    // authenticate user in database
    $sql = "SELECT * FROM user WHERE Username = :username;";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("username", $user->Username);
        $stmt->execute();
        $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;

        if ($dbUser) {
            // we found a user matching that username; authenticate password

            // create and return the session
            session_start();
            $_SESSION['uid'] = uniqid('ang_');
            print $_SESSION['uid'];
        }
    }
    catch (PDOException $e) {
        // DB access error; do not create a session
    }
}

//// authenticate user in database
//$sql = "SELECT *
//          FROM user
//            WHERE Username = :username";
//try {
//    $db = getDB();
//    $stmt = $db->prepare($sql);
//    $stmt->bindParam("username", $username);
//    $stmt->execute();
//    $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
//    $db = null;
//
//    print $dbUser->UserId;
//
////    session_start();
////    $_SESSION['uid'] = $dbUser->UserId;
////    print $_SESSION['uid'];
//
//} catch (PDOException $e) {
//}

//    // check auth info against DB values
////    if (password_verify($user->Password, $dbUser->Password)) {
//    if ($password == $dbUser->Password) {
//        // successful login; generate session
//        session_start();
//        $_SESSION['uid'] = $dbUser->UserId;
//        print $_SESSION['uid'];
//    }
////}
////catch(PDOException $e) {
////}
//
//