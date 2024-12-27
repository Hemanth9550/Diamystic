<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decode the JSON data received from the client
    $data = json_decode(file_get_contents("php://input"), true);
    // Extract the patient ID from the decoded data
    $patientId = isset($data["patientId"]) ? (int)$data["patientId"] : 0;

    if ($patientId <= 0) {
        echo json_encode(array("success" => false, "error" => "Invalid patient ID"));
        exit();
    }

    try {
        // Begin transaction
        $conn->beginTransaction();

        // SQL query to delete the patient with the given ID
        $sqlDelete = "DELETE FROM patientlogin WHERE P_Id = :patientId";
        $stmt = $conn->prepare($sqlDelete);
        $stmt->bindParam(':patientId', $patientId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            // SQL queries to update P_Id values and ensure they are in sequence
            $sqlUpdate = "
                SET @num := 0;
                UPDATE patientlogin SET P_Id = @num := @num + 1;
                ALTER TABLE patientlogin AUTO_INCREMENT = 1;
            ";

            // Execute the update queries
            $conn->exec($sqlUpdate);

            // Commit transaction
            $conn->commit();

            // Send success response
            echo json_encode(array("success" => true));
        } else {
            // Rollback transaction on error
            $conn->rollBack();
            echo json_encode(array("success" => false, "error" => "Error removing patient: " . $stmt->errorInfo()[2]));
        }
    } catch (PDOException $e) {
        // Rollback transaction on error
        $conn->rollBack();
        echo json_encode(array("success" => false, "error" => "Error: " . $e->getMessage()));
    }
} else {
    // If the request method is not POST, send an error response
    echo json_encode(array("success" => false, "error" => "Invalid request method"));
}

// Close the database connection
$conn = null;
?>
