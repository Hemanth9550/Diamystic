<?php
// Database connection parameters
$host = "localhost";
$username = "root";
$password = "";
$dbname = "diabetes";

try {
    // Create PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Define the base URL
$baseUrl = "http://192.168.130.75/diabetes_Exercise/";
?>
