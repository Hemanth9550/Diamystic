<?php
// Database configuration
$servername = "localhost"; // Replace with your database server name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "diabetes"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Assuming you have a session or token to identify the logged-in user
// For example, you might pass the user ID as a parameter from your React Native app
if (isset($_GET['userId'])) {
  $userId = $_GET['userId'];

  // SQL query to fetch contact information
  $sql = "SELECT phone_number, email FROM users WHERE user_id = '$userId'";

  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // Output data of the first (assuming unique user ID) row as JSON object
    $row = $result->fetch_assoc();
    $response = array(
      'phoneNumber' => $row['phone_number'],
      'email' => $row['email']
    );
    echo json_encode($response);
  } else {
    // No user found with the given ID
    echo json_encode(array('error' => 'User not found'));
  }
} else {
  // Missing userId parameter
  echo json_encode(array('error' => 'Missing userId parameter'));
}

$conn->close();
?>
