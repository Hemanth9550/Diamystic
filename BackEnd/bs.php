<?php
// Include the PDO connection file
include 'dbh.php';

header('Content-Type: application/json');

// Receive POST data from React Native
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['P_Id']) && isset($data['beforefood']) && isset($data['afterfood']) && isset($data['date'])) {
    $P_Id = $data['P_Id'];
    $beforefood = $data['beforefood'];
    $afterfood = $data['afterfood'];
    $date = $data['date'];

    try {
        // Retrieve patient's name from the database based on P_Id
        $stmt = $conn->prepare("SELECT name FROM patientlogin WHERE P_Id = :P_Id");
        $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
        $stmt->execute();
        $name = $stmt->fetchColumn();

        if ($name !== false) {
            // Insert data into the sugarlevel table
            $stmt = $conn->prepare("INSERT INTO sugarlevel (P_Id, name, beforefood, afterfood, date) VALUES (:P_Id, :name, :beforefood, :afterfood, :date)");
            $stmt->bindParam(':P_Id', $P_Id, PDO::PARAM_INT);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':beforefood', $beforefood, PDO::PARAM_STR);
            $stmt->bindParam(':afterfood', $afterfood, PDO::PARAM_STR);
            $stmt->bindParam(':date', $date, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $response = array(
                    "success" => true,
                    "message" => "Record added successfully"
                );
            } else {
                $response = array(
                    "success" => false,
                    "message" => "Failed to add record"
                );
            }
        } else {
            $response = array(
                "success" => false,
                "message" => "Patient not found"
            );
        }
    } catch (PDOException $e) {
        $response = array(
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        );
    }
} else {
    $response = array(
        "success" => false,
        "message" => "Missing parameters"
    );
}

// Return response as JSON
echo json_encode($response);

// Close the PDO connection
$conn = null;
?>
