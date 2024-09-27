// Movie data (in a real application, this would come from a server)
const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8, image: "inception.jpg" },
    { id: 2, title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, image: "shawshank.jpg" },
    { id: 3, title: "The Dark Knight", genre: "Action", rating: 9.0, image: "dark_knight.jpg" },
    // Add more movies as needed
];

// DOM Elements
const movieSlider = document.getElementById('movie-slider');
const movieList = document.getElementById('movie-list');
const burgerMenu = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
burgerMenu.addEventListener('click', toggleNav);

function initApp() {
    populateMovieSlider();
    populateMovieList();
}

function populateMovieSlider() {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="title">${movie.title}</div>
        `;
        movieSlider.appendChild(movieCard);
    });
}

function populateMovieList() {
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
                <button class="book-now-btn" data-movie-id="${movie.id}">Book Now</button>
            </div>
        `;
        movieList.appendChild(movieItem);
    });
}

function toggleNav() {
    navLinks.classList.toggle('nav-active');
    burgerMenu.classList.toggle('toggle');
}

// Additional functions for other features will be added here