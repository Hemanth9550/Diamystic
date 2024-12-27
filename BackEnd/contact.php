<?php
header('Content-Type: application/json');

// Include the PDO connection file
include 'dbh.php';

// Function to fetch phone number and email based on doctorId
function fetchContactInfo($conn, $doctorId) {
    try {
        $sql = "SELECT phoneno, email FROM doctorlogin WHERE doctorId = :doctorId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
        $stmt->execute();
        $contactInfo = $stmt->fetch(PDO::FETCH_ASSOC);

        return $contactInfo ? $contactInfo : null;
    } catch (PDOException $e) {
        return ["error" => "Database error: " . $e->getMessage()];
    }
}

// Get the doctorId from the query parameters
if (isset($_GET['doctorId'])) {
    $doctorId = $_GET['doctorId'];
    $contactInfo = fetchContactInfo($conn, $doctorId);

    if ($contactInfo) {
        echo json_encode($contactInfo);
    } else {
        echo json_encode(["error" => "Contact information not found for the provided doctorId"]);
    }
} else {
    echo json_encode(["error" => "Doctor ID not provided"]);
}

// Close the PDO connection
$conn = null;
?>
