<?php

// POST /user/logout/

session_cache_limiter(false);
session_start();

// Unset session variables.
$_SESSION = array();

// Delete the session cookie.
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// And destroy the session.
session_destroy();

echo "{'message': 'success'}";