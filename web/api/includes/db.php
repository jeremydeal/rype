<?php

function getDB() {
//    $dbhost="us-cdbr-iron-east-03.cleardb.net";
//    $dbuser="b39303be9c0f98";
//    $dbpass="cfd24850";
//    $dbname="heroku_adb66377d108485";
//
//    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

    $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

    $server = $url["host"];
    $username = $url["user"];
    $password = $url["pass"];
    $db = substr($url["path"], 1);

    $conn = new PDO($server, $db, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
}
