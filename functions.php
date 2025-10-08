<?php
// Common utility functions

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function formatPrice($price) {
    return 'KES ' . number_format($price, 2);
}

function getStockBadge($status) {
    switch($status) {
        case 'available':
            return '<span class="stock-available">In Stock</span>';
        case 'low':
            return '<span class="stock-low">Low Stock</span>';
        case 'out':
            return '<span class="stock-out">Out of Stock</span>';
        default:
            return '<span>Unknown</span>';
    }
}
?>