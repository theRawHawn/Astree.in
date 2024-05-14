<?php
// Extract data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Database connection parameters
$host = "localhost";
$username = "Rohan Kulakarni";
$password = "Q!A@Z#";
$database = "astrosubmissions";

// Establish connection to MySQL database
$mysqli = new mysqli($host, $username, $password, $database);

// Check for connection errors
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Prepare SQL statement for insertion
$sql = "INSERT INTO order_data (order_id, amount, name, dob, birth_time, AM_PM, birth_place, email, phone_number, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare and bind parameters
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ssssssssss", $data['order_id'], $data['amount'], $data['name'], $data['dob'], $data['birth_time'], $data['AM_PM'], $data['birth_place'], $data['email'], $data['phone_number'], $data['language']);

// Execute the statement
if ($stmt->execute()) {
    // Return success message
    echo "Data inserted successfully.";
} else {
    // Return error message
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}

// Close statement and connection
$stmt->close();
$mysqli->close();
?>
