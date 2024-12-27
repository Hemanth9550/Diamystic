<?php
header('Content-Type: application/json');

// Include the database connection file
require "dbh.php";

// Create a PDO connection
try {
    $conn = new PDO("mysql:host=localhost;dbname=diabetes", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}

// Check if POST variables are set
if (isset($_POST['doctorId'], $_POST['password'], $_POST['doctorname'], $_POST['phoneno'], $_POST['email'], $_POST['gender'], $_POST['age'], $_POST['experience'], $_POST['specialization'])) {
    // Extract values from POST
    $doctorId = $_POST['doctorId'];
    $password = $_POST['password'];
    $doctorname = $_POST['doctorname'];
    $phoneno = $_POST['phoneno'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $experience = $_POST['experience'];
    $specialization = $_POST['specialization'];

    // Check if the doctorId exists
    $checkDoctorIdQuery = "SELECT COUNT(*) AS count FROM doctorlogin WHERE doctorId = :doctorId";
    $stmt = $conn->prepare($checkDoctorIdQuery);
    $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
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
            $getImageSql = "SELECT image FROM doctorlogin WHERE doctorId = :doctorId";
            $stmt = $conn->prepare($getImageSql);
            $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result && $result["image"]) {
                $existingImage = $result["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }
            // Update the image field in the database with the new filename
            $image = $uploadDir . $newFilename;
            $sql = "UPDATE doctorlogin SET password = :password, doctorname = :doctorname, phoneno = :phoneno, email = :email, gender = :gender, age = :age, experience = :experience, specialization = :specialization, image = :image WHERE doctorId = :doctorId";
        } else {
            // Error moving uploaded file
            echo json_encode(["error" => "Failed to move uploaded file."]);
            exit();
        }
    } else {
        // If image file is not uploaded or an error occurred, proceed without updating the image field
        $sql = "UPDATE doctorlogin SET password = :password, doctorname = :doctorname, phoneno = :phoneno, email = :email, gender = :gender, age = :age, experience = :experience, specialization = :specialization WHERE doctorId = :doctorId";
    }

    // Execute the query with prepared statements
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':doctorId', $doctorId, PDO::PARAM_INT);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->bindParam(':doctorname', $doctorname, PDO::PARAM_STR);
        $stmt->bindParam(':phoneno', $phoneno, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->bindParam(':experience', $experience, PDO::PARAM_STR);
        $stmt->bindParam(':specialization', $specialization, PDO::PARAM_STR);
        if (isset($image)) {
            $stmt->bindParam(':image', $image, PDO::PARAM_STR);
        }
        $stmt->execute();

        // Profile updated successfully
        echo json_encode(["success" => "Profile updated successfully"]);
    } catch (PDOException $e) {
        // Error updating profile
        echo json_encode(["error" => "Error: " . $e->getMessage()]);
    }
} else {
    // If POST variables are not set, echo an error message
    echo json_encode(["error" => "Required POST variables are not set"]);
}

// Close connection
$conn = null;
?>
