<?php
// Include the PDO connection file
include 'dbh.php';

header('Content-Type: application/json');

// Receive POST data from React Native
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['P_Id'])) {
    $P_Id = $data['P_Id'];

    try {
        // Prepare the SQL statement
        $stmt = $conn->prepare("SELECT beforefood, afterfood FROM sugarlevel WHERE P_Id = :P_Id ORDER BY date DESC LIMIT 1");
        $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            // Data found, prepare the response
            $response = array(
                "success" => true,
                "beforefood" => $result['beforefood'],
                "afterfood" => $result['afterfood']
            );
        } else {
            // No data found for the given P_Id
            $response = array(
                "success" => false,
                "message" => "No recent data found"
            );
        }
    } catch (PDOException $e) {
        // Handle query errors
        $response = array(
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        );
    }
} else {
    // P_Id not provided in the request
    $response = array(
        "success" => false,
        "message" => "Missing parameters"
    );
}

// Output the response in JSON format
echo json_encode($response);

// Close the PDO connection (optional)
$conn = null;
?>
