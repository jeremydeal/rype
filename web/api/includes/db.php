<?php

function getDB() {
    $dbhost="us-cdbr-iron-east-03.cleardb.net";
    $dbuser="b39303be9c0f98";
    $dbpass="cfd24850";
    $dbname="heroku_adb66377d108485";

    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // make the connection persistent with a 10-minute timeout
    $dbConnection->setAttribute(\PDO::ATTR_TIMEOUT, 600); // 10 mins
    $dbConnection->setAttribute(\PDO::ATTR_PERSISTENT, true);

    return $dbConnection;
}
