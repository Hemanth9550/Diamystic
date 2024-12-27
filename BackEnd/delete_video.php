<?php
// Include the database connection file
require 'dbh.php';

// Set content type to JSON
header('Content-Type: application/json');

// Retrieve JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Check if filename is provided
if (isset($input['filename'])) {
    $filename = $input['filename'];

    try {
        // Prepare SQL statement
        $sql = "DELETE FROM videos WHERE filename = :filename";
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':filename', $filename);
        
        // Execute SQL statement
        if ($stmt->execute()) {
            // Delete the file from the server
            $file_path = 'uploads/' . $filename;
            if (file_exists($file_path)) {
                unlink($file_path);
            }

            // Return success response
            echo json_encode(["success" => true]);
        } else {
            // Return error response
            echo json_encode(["success" => false, "message" => "Failed to delete video"]);
        }
    } catch (PDOException $e) {
        // Return error response
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    // Return error response
    echo json_encode(["success" => false, "message" => "Filename is required"]);
}

// Close the database connection
$conn = null;
?>
