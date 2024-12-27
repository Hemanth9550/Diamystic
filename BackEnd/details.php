<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$database = "your_database";

// Get the patient ID from the request
$patientId = isset($_GET['patientId']) ? $_GET['patientId'] : '';

if (empty($patientId)) {
    // Invalid patient ID
    $response = array("status" => "error", "message" => "Invalid patient ID");
    echo json_encode($response);
    exit();
}

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("status" => "error", "message" => "Connection failed: " . $conn->connect_error)));
}

// Prepare SQL query to fetch patient details
$sql = "SELECT * FROM `loginp` WHERE P_Id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $patientId); // 's' for string
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Close connection
    $stmt->close();
    $conn->close();

    // Return patient data as JSON response
    echo json_encode(array("status" => "success", "patient" => $row));
} else {
    // No patient found
    $response = array("status" => "error", "message" => "No patient found for the specified ID");
    echo json_encode($response);

    // Close connection
    $stmt->close();
    $conn->close();
}
?>
