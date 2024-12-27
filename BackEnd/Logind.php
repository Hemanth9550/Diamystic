<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection file
require "dbh.php";

// Initialize response array
$response = array();

try {
    // Get the raw POST data as a string
    $json_data = file_get_contents("php://input");

    // Decode the JSON data into an associative array
    $request_data = json_decode($json_data, true);

    // Check if 'doctorId' and 'password' keys exist in $request_data
    if (isset($request_data['doctorId']) && isset($request_data['password'])) {
        // Get the doctorId and password from the decoded JSON data
        $doctorId = $request_data['doctorId'];
        $password = $request_data['password'];

        // Query to check login credentials using prepared statements
        $sql = "SELECT doctorname, email FROM doctorlogin WHERE doctorId=:doctorId AND password=:password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result !== false) {
            $response['status'] = "success";
            $response['message'] = "Login successful!";
            $response['doctorname'] = $result['doctorname']; // Ensure correct case here
            $response['email'] = $result['email']; // Add email to response
        } else {
            // Invalid credentials
            $response['status'] = "error";
            $response['message'] = "Invalid doctorId or password";
        }

        // Close the prepared statement
        $stmt->closeCursor();
    } else {
        // Invalid request data
        $response['status'] = "error";
        $response['message'] = "Invalid request data";
    }
} catch (Exception $e) {
    // Exception occurred
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Respond with JSON
echo json_encode($response);
?>
