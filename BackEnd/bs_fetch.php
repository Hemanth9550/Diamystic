<?php
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

$response = array();

if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];

    // Debug: log the received P_Id
    error_log("Received P_Id: " . $P_Id);

    try {
        // Prepare and execute the SQL statement
        $sql = "SELECT beforefood, afterfood, date FROM sugarlevel WHERE P_Id = :P_Id ORDER BY date DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($results) > 0) {
            $response = array(
                "success" => true,
                "data" => $results
            );
        } else {
            $response = array(
                "success" => false,
                "message" => "No data found"
            );
        }
    } catch (PDOException $e) {
        error_log("Database query failed: " . $e->getMessage());
        $response = array(
            "success" => false,
            "message" => "Database error"
        );
    }
} else {
    $response = array(
        "success" => false,
        "message" => "Invalid request"
    );
}

// Close the database connection
$conn = null;

echo json_encode($response);
?>
