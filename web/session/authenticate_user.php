<?php

require_once '../api/includes/db.php';

$user = json_decode(file_get_contents('php://input'));

// authenticate user in database
$sql = "SELECT *
          FROM customer
          WHERE Email = :email";
try {
    $db = getDB();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $user->Email);
    $stmt->execute();
    $dbUser = $stmt->fetch(PDO::FETCH_OBJ);
    $db = null;

    // check auth info against DB values
    if (password_verify($user->Password, $dbUser->Password)) {
        // successful login; generate session
        session_start();
        $_SESSION['uid'] = $dbUser->CustomerId;
        print $_SESSION['uid'];
    }
}
catch(PDOException $e) {
}


//
//    if ($user->Email == "jeremy.n.deal@gmail.com" && $user->Password == "shadows1") {
//        session_start();
//        $_SESSION['uid'] = uniqid('ang_');
//        print $_SESSION['uid'];
//    }