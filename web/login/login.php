<?php

// POST /user/login/
require_once 'loginInit.php';


// grab $_POST data
$json = json_decode($_POST);

var_dump($json);

// grab auth info from DB
$user = null;

$sql = "SELECT *
          FROM user
          WHERE user.Email = :email";
try {
    $db = getDB();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $json->Email);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $user = $users[0];
    $db = null;

        // check auth info against DB values
        if ($user != null && password_verify($json->Password, $user->Password))
        {
            // successful login; generate session
            session_start();
            $_SESSION['UserId'] = $user->UserId;
        }
        else {
            // failed login; return null user
            $user = null;
        }

} catch(PDOException $e) {
    // leave $user null
}


echo "{'user': " . json_encode($user) . "}";