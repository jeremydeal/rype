<?php
    require_once '../api/includes/db.php';

	$user = json_decode(file_get_contents('php://input'));

    if ($user->Email == "jeremy.n.deal@gmail.com" && $user->Password == "shadows1") {
        session_start();
        $_SESSION['uid'] = uniqid('ang_');
        print $_SESSION['uid'];
    }