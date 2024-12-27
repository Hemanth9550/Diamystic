<?php
header('Content-Type: application/json');

// Include the PDO connection file
include 'dbh.php';

// Check if POST variables are set
if (isset($_POST['P_Id'], $_POST['password'], $_POST['confirmpassword'], $_POST['patientName'], $_POST['mob'], $_POST['gender'], $_POST['age'], $_POST['occupation'], $_POST['address'])) {
    // Extract values from POST
    $P_Id = $_POST['P_Id'];
    $password = $_POST['password'];
    $confirmpassword = $_POST['confirmpassword'];
    $patientName = $_POST['patientName'];
    $mob = $_POST['mob'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $occupation = $_POST['occupation'];
    $address = $_POST['address'];
    $image = '';

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
            // Get the existing image filename for the patient
            $getImageSql = "SELECT image FROM patientlogin WHERE P_Id = :P_Id";
            $stmt = $conn->prepare($getImageSql);
            $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $existingImage = $row["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }
            // Update the image field with the new filename
            $image = $uploadDir . $newFilename;
        } else {
            // Error moving uploaded file
            die(json_encode(["error" => "Failed to move uploaded file."]));
        }
    }

    // Check if password matches confirm password
    if ($password !== $confirmpassword) {
        die(json_encode(["error" => "Passwords do not match"]));
    }

    // Update the patient details in the database
    $sql = "UPDATE patientlogin SET password = :password, name = :patientName, mob = :mob, gender = :gender, age = :age, occupation = :occupation, address = :address, image = :image WHERE P_Id = :P_Id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':patientName', $patientName);
    $stmt->bindParam(':mob', $mob);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':occupation', $occupation);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        // Profile updated successfully
        echo json_encode(["success" => "Profile updated successfully"]);
    } else {
        // Error updating profile
        echo json_encode(["error" => "Error updating profile"]);
    }
} else {
    // If POST variables are not set, echo an error message
    echo json_encode(["error" => "Required POST variables are not set"]);
}

// Close the connection
$conn = null;
?>
