<?php
    require_once '../api/includes/db.php';

	$user = json_decode(file_get_contents('php://input'));

//	// check user password
//    $sql = "SELECT *
//          FROM user
//          WHERE Email = :email";
//    try {
//        $db = getDB();
//        $stmt = $db->prepare($sql);
//        $stmt->bindParam("email", $user->Email);
//        $stmt->execute();
//        $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
//        $db = null;
//
//        var_dump($dbUser);
//
//        // check auth info against DB values
//        if ($user != null && password_verify($user->Password, $dbUser->Password))
//        {
//            // successful login; generate session

if ($user->Email == "jeremy.n.deal@gmail.com" && $user->Password == "shadows1") {
    session_start();
    $_SESSION['uid'] = uniqid('ang_');
    print $_SESSION['uid'];
}
//
//            // return user
//            $dbUser->uid = $_SESSION['uid'];
//            print '{"user": ' . json_encode($dbUser) . '}';
//        }
//    }
//    catch(PDOException $e) {
//        // database access failed; do not return uid
//    }