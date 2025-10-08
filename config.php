<?php
session_start();

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'samaki_express');
define('DB_USER', 'root');  // Default XAMPP username
define('DB_PASS', '');      // Default XAMPP password (empty)

// Create connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Website configuration
define('SITE_URL', 'http://localhost/samaki-express');
define('SITE_NAME', 'Samaki Express EA Ltd');

// Helper function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Helper function to redirect
function redirect($url) {
    header("Location: $url");
    exit;
}
?>