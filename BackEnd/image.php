<?php
header('Content-Type: application/json');

// Dynamically determine the base URL
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . "://" . $host . "/diabetes_Exercise/"; // Adjust the path if needed

// Include the database connection file
include 'dbh.php';

// Function to fetch doctor image
function fetchDoctorImage($conn, $P_Id) {
    global $baseURL; // Use global base URL
    
    $sql = "SELECT image FROM patientlogin WHERE P_Id = :P_Id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Append base URL to image path if image exists
        if ($row['image']) {
            $row['image'] = $GLOBALS['baseURL'] . $row['image'];
            return ["status" => "success", "image" => $row['image']];
        } else {
            return ["status" => "error", "message" => "Image not found"];
        }
    } else {
        return ["status" => "error", "message" => "Patient not found"];
    }
}

// Get the P_Id from the query parameters
if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];
    $response = fetchDoctorImage($conn, $P_Id);
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Patient ID not provided"]);
}

$conn = null; // Close the PDO connection
?>
