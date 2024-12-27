<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Initialize response array
$response = array();

try {
    // Get the patient ID from the query parameter
    $P_Id = $_GET['P_Id'];
    error_log("Received P_Id: " . $P_Id);

    // Prepare SQL statement to fetch patient details including BMI
    $sql = "SELECT P_Id, height, weight, waistCircumference, hipCircumference, whr, beforeFood, afterFood, srUrea, srCreatine, hba1c, date, bmi 
            FROM patient 
            WHERE P_Id = :P_Id 
            ORDER BY date DESC LIMIT 3";
    error_log("SQL Query: " . $sql);

    // Prepare and execute the statement
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
    $stmt->execute();

    // Check for SQL errors
    if ($stmt->errorCode() !== '00000') {
        error_log("SQL Error: " . print_r($stmt->errorInfo(), true));
    }

    // Fetch results into an array
    $patientDetails = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $patientDetails[] = $row;
    }
    error_log("Patient Details: " . print_r($patientDetails, true));

    if (!empty($patientDetails)) {
        $response['status'] = "success";
        $response['patientDetails'] = $patientDetails;
    } else {
        $response['status'] = "error";
        $response['message'] = "Patient not found or no records available";
    }
} catch (PDOException $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Respond with JSON
echo json_encode($response);
?>
