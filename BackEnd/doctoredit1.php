<?php
header('Content-Type: application/json');

// Include the database connection file
require "dbh.php";

// Function to fetch doctor details
function fetchDoctorDetails($conn, $doctorId) {
    $sql = "SELECT doctorname, phoneno, email, gender, age, experience, specialization, image FROM doctorlogin WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Append base URL to image path if image exists
        if (!empty($result['image'])) {
            // Use global base URL
            $result['image'] = $GLOBALS['baseURL'] . $result['image'];
        }
        return $result;
    } else {
        return null;
    }
}

// Get the base URL dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . "://" . $host . "/diabetes_Exercise/";

// Set the global base URL variable
$GLOBALS['baseURL'] = $baseURL;

// Initialize response array
$response = [];

// Get the doctorId from the query parameters
if (isset($_GET['doctorId'])) {
    $doctorId = $_GET['doctorId'];
    $doctorDetails = fetchDoctorDetails($conn, $doctorId);

    if ($doctorDetails) {
        $response = $doctorDetails;
    } else {
        $response = ["error" => "Doctor not found"];
    }
} else {
    $response = ["error" => "Doctor ID not provided"];
}

// Add base URL to response
$response['base_url'] = $baseURL;

// Return response as JSON
echo json_encode($response);

// Close connection
$conn = null;
?>
