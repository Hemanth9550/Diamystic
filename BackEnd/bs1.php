<?php
// Include the PDO connection file
include 'dbh.php';

header('Content-Type: application/json');

// Check if P_Id is provided
if (isset($_GET['P_Id'])) {
    $P_Id = $_GET['P_Id'];

    try {
        // Prepare the SQL statement
        $sql = "SELECT beforefood, afterfood, date FROM sugarlevel WHERE P_Id = :P_Id ORDER BY date DESC LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            // Data found, prepare the response
            $response = array(
                "beforefood" => $result['beforefood'],
                "afterfood" => $result['afterfood'],
                "date" => $result['date']
            );
        } else {
            // No data found for the given P_Id
            $response = array(
                "success" => false,
                "message" => "No data found"
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
        "message" => "Invalid request"
    );
}

// Close the PDO connection (optional)
$conn = null;

// Output the response in JSON format
echo json_encode($response);
?>
