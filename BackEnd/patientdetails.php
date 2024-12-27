<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Initialize response array
$response = array();

try {
    // Check if all required fields are set
    if (
        isset($_POST['name'], $_POST['age'], $_POST['gender'], $_POST['address'], $_POST['occupation'], $_POST['typeOfWorker'], $_POST['annualIncome'], $_POST['phoneNumber'], $_POST['email'], $_POST['loginId'], $_POST['password'], $_POST['confirmPassword'], $_FILES['image'], $_POST['doctorId'])
    ) {
        // Get the data from the form fields
        $name = $_POST['name'];
        $age = $_POST['age'];
        $gender = $_POST['gender'];
        $address = $_POST['address'];
        $occupation = $_POST['occupation'];
        $typeOfWorker = $_POST['typeOfWorker'];
        $annualIncome = $_POST['annualIncome'];
        $phoneNumber = $_POST['phoneNumber'];
        $email = $_POST['email'];
        $loginId = $_POST['loginId'];
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];
        $doctorId = $_POST['doctorId'];

        // Handle image upload
        $imageDirectory = "images/";
        $imageFileName = uniqid() . "_photo.jpeg"; // Change the file extension as per your desired image format, e.g., .jpg, .png
        $imagePath = $imageDirectory . $imageFileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            // Prepare SQL statement to insert data into the database
            $sql = "INSERT INTO patientlogin (name, age, gender, address, occupation, typeofworker, annualincome, mob, mail, loginId, password, cpass, image, doctorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            // Prepare and execute the SQL statement
            $stmt = $conn->prepare($sql);
            $stmt->execute([$name, $age, $gender, $address, $occupation, $typeOfWorker, $annualIncome, $phoneNumber, $email, $loginId, $password, $confirmPassword, $imagePath, $doctorId]);

            // Check if the insertion was successful
            if ($stmt->rowCount() > 0) {
                $response['status'] = "success";
                $response['message'] = "Registration successful!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to register user";
            }
        } else {
            // Failed to save image
            $response['status'] = "error";
            $response['message'] = "Failed to save image";
        }
    } else {
        // Handle the case where any required field is missing
        $response['status'] = "error";
        $response['message'] = "Missing required fields";
    }
} catch (Exception $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
