<?php
// Database connection (replace with your actual database credentials)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "movie_booking_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get all movies
function getMovies() {
    global $conn;
    $sql = "SELECT * FROM movies";
    $result = $conn->query($sql);
    $movies = [];
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
    }
    
    return $movies;
}

// Function to get movie details
function getMovieDetails($movieId) {
    global $conn;
    $sql = "SELECT * FROM movies WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $movieId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    
    return null;
}

// Function to book tickets
function bookTickets($userId, $movieId, $seats, $showtime) {
    global $conn;
    $sql = "INSERT INTO bookings (user_id, movie_id, seats, showtime) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiss", $userId, $movieId, $seats, $showtime);
    
    if ($stmt->execute()) {
        return true;
    }
    
    return false;
}

// API endpoint to get movies
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_movies') {
    $movies = getMovies();
    echo json_encode($movies);
}

// API endpoint to get movie details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_movie_details' && isset($_GET['movie_id'])) {
    $movieDetails = getMovieDetails($_GET['movie_id']);
    echo json_encode($movieDetails);
}

// API endpoint to book tickets
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'book_tickets') {
    $userId = $_POST['user_id'];
    $movieId = $_POST['movie_id'];
    $seats = $_POST['seats'];
    $showtime = $_POST['showtime'];
    
    $result = bookTickets($userId, $movieId, $seats, $showtime);
    echo json_encode(['success' => $result]);
}

$conn->close();
?>