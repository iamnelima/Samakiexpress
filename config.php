<?php
session_start();

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'samaki_express');
define('DB_USER', 'clinton');  // Default XAMPP username
define('DB_PASS', 'blindspot');      // Default XAMPP password (empty)

// Create connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Website configuration
define('SITE_URL', 'http://localhost/samaki-express');
define('SITE_NAME', 'Samaki Express EA Ltd');

// Helper function to check if user is logged in
function isLoggedIn()
{
    return isset($_SESSION['user_id']);
}

// Helper function to redirect
function redirect($url)
{
    header("Location: $url");
    exit;
}

// CSRF Protection Functions
function generateCSRFToken()
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken($token)
{
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Rate Limiting Function
function checkRateLimit($action, $limit = 5, $window = 900)
{ // 5 attempts per 15 minutes
    $key = $action . '_' . $_SERVER['REMOTE_ADDR'];
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 0, 'first_attempt' => time()];
    }

    $data = &$_SESSION[$key];
    if (time() - $data['first_attempt'] > $window) {
        $data['count'] = 0;
        $data['first_attempt'] = time();
    }

    if ($data['count'] >= $limit) {
        return false; // Rate limit exceeded
    }

    $data['count']++;
    return true;
}
