<?php
header('Content-Type: application/json');
include '../includes/config.php';

try {
    $stmt = $pdo->query("SELECT * FROM products ORDER BY name");
    $products = $stmt->fetchAll();

    echo json_encode(['success' => true, 'products' => $products]);

} catch(PDOException $e) {
    error_log("Products fetch error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to load products']);
}
?>