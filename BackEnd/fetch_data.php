<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Get the doctor ID from the request
$doctorId = isset($_GET['doctorId']) ? $_GET['doctorId'] : '';

if (empty($doctorId)) {
    // Invalid doctor ID
    $response = array("status" => "error", "message" => "Invalid doctor ID");
    echo json_encode($response);
    exit();
}

try {
    // Prepare SQL query to fetch data for the specified doctor with concatenated image path, ordered by P_Id in descending order
    $sql = "SELECT *, CONCAT(:baseUrl, image) AS image_path 
            FROM `patientlogin` 
            WHERE doctorId = :doctorId 
            ORDER BY P_Id DESC 
            LIMIT 10";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':baseUrl', $baseUrl);
    $stmt->bindParam(':doctorId', $doctorId);
    
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($data) > 0) {
        // Return data array as JSON response
        echo json_encode(array("status" => "success", "data" => $data));
    } else {
        // No data found
        $response = array("status" => "error", "message" => "No data found for the specified doctor ID");
        echo json_encode($response);
    }
} catch (PDOException $e) {
    echo json_encode(array("status" => "error", "message" => "Query failed: " . $e->getMessage()));
}

// Close the database connection
$conn = null;
?>
