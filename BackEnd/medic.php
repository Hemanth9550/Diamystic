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
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if all required fields are set
    if (isset($input['P_Id'], $input['height'], $input['weight'], $input['waistCircumference'], $input['hipCircumference'], $input['whr'], $input['bmi'], $input['beforeFood'], $input['afterFood'], $input['srUrea'], $input['srCreatine'], $input['hba1c'], $input['date'])) {
        // Get the data from the form fields
        $P_Id = $input['P_Id'];
        $height = $input['height'];
        $weight = $input['weight'];
        $waistCircumference = $input['waistCircumference'];
        $hipCircumference = $input['hipCircumference'];
        $whr = $input['whr'];
        $bmi = $input['bmi'];
        $beforeFood = $input['beforeFood'];
        $afterFood = $input['afterFood'];
        $srUrea = $input['srUrea'];
        $srCreatine = $input['srCreatine'];
        $hba1c = $input['hba1c']; // Changed from eoa to hba1c
        $date = $input['date'];

        // Prepare SQL statement to insert data into the database
        $sql = "INSERT INTO patient (P_Id, height, weight, waistCircumference, hipCircumference, whr, bmi, beforeFood, afterFood, srUrea, srCreatine, hba1c, date) VALUES (:P_Id, :height, :weight, :waistCircumference, :hipCircumference, :whr, :bmi, :beforeFood, :afterFood, :srUrea, :srCreatine, :hba1c, :date)";

        // Prepare and execute the SQL statement
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
        $stmt->bindParam(':height', $height);
        $stmt->bindParam(':weight', $weight);
        $stmt->bindParam(':waistCircumference', $waistCircumference);
        $stmt->bindParam(':hipCircumference', $hipCircumference);
        $stmt->bindParam(':whr', $whr);
        $stmt->bindParam(':bmi', $bmi);
        $stmt->bindParam(':beforeFood', $beforeFood);
        $stmt->bindParam(':afterFood', $afterFood);
        $stmt->bindParam(':srUrea', $srUrea);
        $stmt->bindParam(':srCreatine', $srCreatine);
        $stmt->bindParam(':hba1c', $hba1c);
        $stmt->bindParam(':date', $date);

        // Execute the statement
        $stmt->execute();

        // Check if the insertion was successful
        if ($stmt->rowCount() > 0) {
            $response['status'] = "success";
            $response['message'] = "Details added successfully!";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to add details";
        }
    } else {
        // Handle the case where any required field is missing
        $response['status'] = "error";
        $response['message'] = "Missing required fields";
    }
} catch (PDOException $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);
?>
