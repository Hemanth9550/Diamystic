<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Dynamically construct the base URL
$protocol = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] . '://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . $host . '/diabetes_Exercise/';

// Get the doctorId from the request
$doctorId = isset($_GET['doctorId']) ? $_GET['doctorId'] : '';

// Validate doctorId
if (empty($doctorId)) {
    $response = array("status" => "error", "message" => "Invalid or missing doctorId parameter");
    echo json_encode($response);
    exit();
}

try {
    // Prepare SQL query to fetch data for the specified doctorId with concatenated image path
    $sql = "SELECT *, CONCAT(:baseURL, image) AS image_path FROM `doctorlogin` WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':baseURL', $baseURL, PDO::PARAM_STR);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_STR); // Changed to PARAM_STR to accommodate possible leading zeros

    // Execute query
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Return data as JSON response
        echo json_encode(array("status" => "success", "image" => $result['image_path']));
    } else {
        // No data found
        $response = array("status" => "error", "message" => "No data found for the specified doctorId");
        echo json_encode($response);
    }
} catch (PDOException $e) {
    // Error handling
    $response = array("status" => "error", "message" => "Error: " . $e->getMessage());
    echo json_encode($response);
}

// Close connection
$conn = null;
?>
