<?php
// MySQL database connection parameters
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "diabetes"; // Your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Check if POST variables are set
if (isset($_POST['doctorId'], $_POST['password'], $_POST['confirmpassword'], $_POST['doctorname'], $_POST['phoneno'], $_POST['gender'], $_POST['age'], $_POST['experience'], $_POST['specialization'])) {
    // Extract values from POST
    $doctorId = $_POST['doctorId'];
    $password = $_POST['password'];
    $confirmpassword = $_POST['confirmpassword'];
    $doctorname = $_POST['doctorname'];
    $phoneno = $_POST['phoneno'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $experience = $_POST['experience'];
    $specialization = $_POST['specialization'];

    // Check if password matches confirm password
    if ($password !== $confirmpassword) {
        echo json_encode(["error" => "Passwords do not match"]);
        exit();
    }

    // Check if the doctorId exists
    $checkDoctorIdQuery = "SELECT COUNT(*) AS count FROM logind WHERE doctorId = '$doctorId'";
    $checkDoctorIdResult = $conn->query($checkDoctorIdQuery);
    $row = $checkDoctorIdResult->fetch_assoc();
    $doctorCount = $row['count'];

    if ($doctorCount == 0) {
        // If doctorId does not exist, return an error message
        echo json_encode(["error" => "Doctor with ID $doctorId not found"]);
        exit();
    }

    // Check if image file is uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Specify the directory for storing the uploaded images
        $uploadDir = "images/";

        // Get the temporary filename of the uploaded file
        $tempFilename = $_FILES['image']['tmp_name'];

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . basename($_FILES['image']['name']);

        // Move the uploaded file to the specified directory with the new filename
        if (move_uploaded_file($tempFilename, $uploadDir . $newFilename)) {
            // Get the existing image filename for the doctor
            $getImageSql = "SELECT image FROM logind WHERE doctorId = '$doctorId'";
            $result = $conn->query($getImageSql);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $existingImage = $row["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }
            // Update the image field in the database with the new filename
            $image = $uploadDir . $newFilename;
            $sql = "UPDATE logind SET password = '$password', confirmpassword = '$confirmpassword', doctorname = '$doctorname', phoneno = '$phoneno', gender = '$gender', age = '$age', experience = '$experience', specialization = '$specialization', image = '$image' WHERE doctorId = '$doctorId'";
        } else {
            // Error moving uploaded file
            echo json_encode(["error" => "Failed to move uploaded file."]);
            exit();
        }
    } else {
        // If image file is not uploaded or an error occurred, proceed without updating the image field
        $sql = "UPDATE logind SET password = '$password', confirmpassword = '$confirmpassword', doctorname = '$doctorname', phoneno = '$phoneno', gender = '$gender', age = '$age', experience = '$experience', specialization = '$specialization' WHERE doctorId = '$doctorId'";
    }

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        // Profile updated successfully
        echo json_encode(["success" => "Profile updated successfully"]);
    } else {
        // Error updating profile
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    // If POST variables are not set, echo an error message
    echo json_encode(["error" => "Required POST variables are not set"]);
}

// Close connection
$conn->close();
?>
