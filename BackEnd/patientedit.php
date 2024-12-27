<?php
// Include the database connection file
include 'dbh.php';

// Fetch the client's IP address
$ip_address = $_SERVER['REMOTE_ADDR'];

// Check if POST variables are set
if(isset($_POST['patientId'], $_POST['name'], $_POST['contactNo'], $_POST['age'], $_POST['gender'], $_POST['height'], $_POST['weight'], $_POST['patientCase'], $_POST['painDuration'], $_POST['admittedOn'], $_POST['rbs'], $_POST['password'], $_POST['confirmPassword'])) {
    // Extract values from POST
    $patientId = $_POST['patientId'];
    $name = $_POST['name'];
    $contactNo = $_POST['contactNo'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $height = $_POST['height'];
    $weight = $_POST['weight'];
    $patientCase = $_POST['patientCase'];
    $painDuration = $_POST['painDuration'];
    $admittedOn = $_POST['admittedOn'];
    $rbs = $_POST['rbs'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Check if password matches confirm password
    if($password !== $confirmPassword) {
        echo "Error: Passwords do not match";
        exit();
    }

    // Check if the patientId exists
    $checkPatientIdQuery = "SELECT COUNT(*) AS count FROM patients3 WHERE patientId = :patientId";
    $stmt = $dbh->prepare($checkPatientIdQuery);
    $stmt->execute([':patientId' => $patientId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $patientCount = $row['count'];

    if($patientCount == 0) {
        // If patientId does not exist, return an error message
        echo "Error: Patient with ID $patientId not found";
        exit();
    }

    // Prepare the SQL query to update the patient record
    if(isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Specify the directory for storing the uploaded images
        $uploadDir = "uploads/";

        // Get the temporary filename of the uploaded file
        $tempFilename = $_FILES['image']['tmp_name'];

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . basename($_FILES['image']['name']);

        // Move the uploaded file to the specified directory with the new filename
        if(move_uploaded_file($tempFilename, $uploadDir . $newFilename)) {
            // Get the existing image filename for the patient
            $getImageSql = "SELECT image FROM patients3 WHERE patientId = :patientId";
            $stmt = $dbh->prepare($getImageSql);
            $stmt->execute([':patientId' => $patientId]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($result) {
                $existingImage = $result["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }

            // Update the image field in the database with the new filename
            $image = $uploadDir . $newFilename;
            $sql = "UPDATE patients3 SET name = :name, contactNo = :contactNo, age = :age, gender = :gender, height = :height, weight = :weight, patientCase = :patientCase, painDuration = :painDuration, admittedOn = :admittedOn, rbs = :rbs, password = :password, confirmPassword = :confirmPassword, image = :image WHERE patientId = :patientId";
            $params = [':name' => $name, ':contactNo' => $contactNo, ':age' => $age, ':gender' => $gender, ':height' => $height, ':weight' => $weight, ':patientCase' => $patientCase, ':painDuration' => $painDuration, ':admittedOn' => $admittedOn, ':rbs' => $rbs, ':password' => $password, ':confirmPassword' => $confirmPassword, ':image' => $image, ':patientId' => $patientId];
        } else {
            // Error moving uploaded file
            echo "Error: Failed to move uploaded file.";
            exit();
        }
    } else {
        // If image file is not uploaded or an error occurred, proceed without updating the image field
        $sql = "UPDATE patients3 SET name = :name, contactNo = :contactNo, age = :age, gender = :gender, height = :height, weight = :weight, patientCase = :patientCase, painDuration = :painDuration, admittedOn = :admittedOn, rbs = :rbs, password = :password, confirmPassword = :confirmPassword WHERE patientId = :patientId";
        $params = [':name' => $name, ':contactNo' => $contactNo, ':age' => $age, ':gender' => $gender, ':height' => $height, ':weight' => $weight, ':patientCase' => $patientCase, ':painDuration' => $painDuration, ':admittedOn' => $admittedOn, ':rbs' => $rbs, ':password' => $password, ':confirmPassword' => $confirmPassword, ':patientId' => $patientId];
    }

    // Prepare and execute the SQL query
    $stmt = $dbh->prepare($sql);
    if ($stmt->execute($params)) {
        // Password and image (if uploaded) updated successfully
        echo "Profile updated successfully";
    } else {
        // Error updating profile
        echo "Error: " . $stmt->errorInfo()[2];
    }
} else {
    // If POST variables are not set, echo an error message
    echo "Error: Required POST variables are not set";
}

// Close connection
$dbh = null;
?>
