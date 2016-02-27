<?php

require_once 'db.php';

$user = json_decode(file_get_contents('php://input'));
$username = $user->Username;
$password = $user->Password;

//print $email . " and " . $password;

// authenticate user in database
$sql = "SELECT *
              FROM user
                WHERE Username = :username";
try {
    $db = getDB();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    $dbUsers = $stmt->fetchAll(PDO::FETCH_OBJ);
    $dbUser = $dbUsers[0];
    $db = null;
    print '{"user": ' . json_encode($dbUser) . '}';
} catch (PDOException $e) {
    echo '{"error: { "text": ' . $e->getMessage() . '} }';
}



//$sql = "SELECT UserId, Email, Password
//          FROM user
//          WHERE Email = :email";
////try {
//    $db = getDB();
//    $stmt = $db->prepare($sql);
//    $stmt->bindParam("email", $email);
//    $stmt->execute();
//    $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
//    $db = null;
//
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
////
////    if ($user->Email == "jeremy.n.deal@gmail.com" && $user->Password == "shadows1") {
////        session_start();
////        $_SESSION['uid'] = uniqid('ang_');
////        print $_SESSION['uid'];
////    }