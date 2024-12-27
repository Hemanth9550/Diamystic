<?php
// Include the database connection file
require 'dbh.php';

// Set header for JSON response
header('Content-Type: application/json');

// Retrieve POST data from the form (sanitize input to prevent SQL injection)
$doctorId = $_POST['doctorId'];
$doctorname = $_POST['doctorname'];
$password = $_POST['password'];
$phoneNo = $_POST['phoneNo'];
$email = $_POST['email']; // Renamed to email
$gender = $_POST['gender'];
$age = $_POST['age'];
$experience = $_POST['experience'];
$specialization = $_POST['specialization'];

// Initialize response array
$response = array();

try {
    // Prepare SQL statement to insert data
    $sql = "INSERT INTO doctorlogin (doctorId, doctorname, password, phoneNo, email, gender, age, experience, specialization)
            VALUES (:doctorId, :doctorname, :password, :phoneNo, :email, :gender, :age, :experience, :specialization)";

    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':doctorId', $doctorId);
    $stmt->bindParam(':doctorname', $doctorname);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':phoneNo', $phoneNo);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':experience', $experience);
    $stmt->bindParam(':specialization', $specialization);

    // Execute the statement
    if ($stmt->execute()) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
        $response['error'] = 'Failed to insert data';
    }
} catch (PDOException $e) {
    // Handle exceptions
    $response['status'] = 'error';
    $response['error'] = $e->getMessage();
}

// Send JSON response back to the client
echo json_encode($response);
?>
