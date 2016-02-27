<?php 
	$user = json_decode(file_get_contents('php://input'));

	// check user password
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
            $_SESSION['uid'] = uniqid('ang_');

            // return user
            $dbUser->uid = $_SESSION['uid'];
            echo '{"user": ' . json_encode($dbUser) . '}';
        }
    }
    catch(PDOException $e) {
        // database access failed; do not return uid
    }
?>