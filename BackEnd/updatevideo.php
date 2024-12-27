<?php
header("Content-Type: application/json");

// Include the database connection file
require 'dbh.php';

// Get the base URL dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$baseURL = $protocol . "://" . $host . "/diabetes_Exercise/uploads/";

// Initialize response array
$response = array();

// Get POST data
$doctorId = isset($_POST['doctorId']) ? $_POST['doctorId'] : '';
$introduction = isset($_POST['introduction']) ? $_POST['introduction'] : '';

// Check for missing required fields
if (empty($doctorId) || empty($introduction)) {
    echo json_encode(array("message" => "Missing required fields.", "doctorId" => $doctorId, "introduction" => $introduction));
    $conn = null;
    exit();
}

// Check if video file is uploaded
if (isset($_FILES['video_file']) && $_FILES['video_file']['error'] == UPLOAD_ERR_OK) {
    // File upload directory
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    $videoFileType = strtolower(pathinfo(basename($_FILES["video_file"]["name"]), PATHINFO_EXTENSION));
    $filename = uniqid() . '.' . $videoFileType;
    $targetFilePath = $targetDir . $filename;

    // Check if the video file is a valid video file
    $allowedTypes = array('mp4', 'mov', 'avi', 'mkv');
    if (in_array($videoFileType, $allowedTypes)) {
        // Upload file to server
        if (move_uploaded_file($_FILES["video_file"]["tmp_name"], $targetFilePath)) {
            // Construct the video URL
            $video_url = $baseURL . $filename; // Use $filename directly for the URL

            try {
                // Insert video file information into database
                $sql = "INSERT INTO videos (doctorId, introduction, filename, video_url) VALUES (:doctorId, :introduction, :filename, :video_url)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':doctorId', $doctorId);
                $stmt->bindParam(':introduction', $introduction);
                $stmt->bindParam(':filename', $filename);
                $stmt->bindParam(':video_url', $video_url);

                if ($stmt->execute()) {
                    echo json_encode(array("message" => "Video uploaded successfully.", "video_url" => $video_url));
                } else {
                    echo json_encode(array("message" => "Failed to insert video information into database."));
                }
            } catch (PDOException $e) {
                echo json_encode(array("message" => "Database error: " . $e->getMessage()));
            }
        } else {
            echo json_encode(array("message" => "Failed to upload video file."));
        }
    } else {
        echo json_encode(array("message" => "Invalid video file type. Allowed types: mp4, mov, avi, mkv."));
    }
} else {
    echo json_encode(array("message" => "No video file uploaded or there was an error uploading the file."));
}

// Close the database connection
$conn = null;
?>
