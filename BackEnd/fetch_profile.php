<?php
header('Content-Type: application/json');

// Include the PDO connection file
include 'dbh.php';

// Dynamically determine the base URL
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . "://" . $host . "/diabetes_Exercise/"; // Adjust the path if needed

// Function to fetch doctor details
function fetchDoctorDetails($conn, $P_Id, $baseURL) {
    $sql = "SELECT name, mob, gender, age, occupation, address, image FROM patientlogin WHERE P_Id = :P_Id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Append base URL to image path if image exists
        if ($row['image']) {
            $row['image'] = $baseURL . $row['image'];
        }
        return $row;
    } else {
        return null;
    }
}

// Get the P_Id from the query parameters
if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];
    $doctorDetails = fetchDoctorDetails($conn, $P_Id, $baseURL);

    if ($doctorDetails) {
        echo json_encode($doctorDetails);
    } else {
        echo json_encode(["error" => "Doctor not found"]);
    }
} else {
    echo json_encode(["error" => "Doctor ID not provided"]);
}

// Close the connection
$conn = null;
?>
