<?php
header('Content-Type: application/json');

// Include the database connection file
require "dbh.php";

// Check if the download type is specified
if (isset($_GET['type'])) {
    $type = $_GET['type'];
    switch ($type) {
        case 'personal':
            downloadPersonalData($conn);
            break;
        case 'medical':
            downloadMedicalData($conn);
            break;
        case 'bloodsugar':
            downloadBloodSugarData($conn);
            break;
        default:
            echo json_encode(["error" => "Invalid type specified"]);
            break;
    }
} else {
    echo json_encode(["error" => "No type specified"]);
}

function downloadPersonalData($conn) {
    $sql = "SELECT `P_Id`, `name`, `age`, `gender`, `address`, `occupation`, `typeofworker`, `annualincome`, `mob`, `mail`, `loginId`, `password`, `cpass`, `image`, `doctorId` FROM patientlogin";
    $stmt = $conn->query($sql);
    outputCSV($stmt, 'Patient_Personal_Data.csv');
}

function downloadMedicalData($conn) {
    $sql = "SELECT `id`, `P_Id`, `height`, `weight`, `waistCircumference`, `hipCircumference`, `whr`, `bmi`, `beforefood`, `afterfood`, `srUrea`, `srCreatine`, `hba1c`, `date` FROM patient";
    $stmt = $conn->query($sql);
    outputCSV($stmt, 'Patient_Medical_Data.csv');
}

function downloadBloodSugarData($conn) {
    $sql = "SELECT `id`, `P_Id`, `name`, `beforefood`, `afterfood`, `date` FROM sugarlevel";
    $stmt = $conn->query($sql);
    outputCSV($stmt, 'Blood_Sugar_Data.csv');
}

function outputCSV($stmt, $filename) {
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) > 0) {
        $fp = fopen('php://output', 'w');
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        fputcsv($fp, array_keys($rows[0])); // Write headers
        foreach ($rows as $row) {
            fputcsv($fp, $row);
        }
        fclose($fp);
    } else {
        echo json_encode(["error" => "No data found"]);
    }
    exit;
}

?>
