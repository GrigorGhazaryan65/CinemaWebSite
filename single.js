const apiKey = "450de2ccb3594f7792ac2434c91755ce"; 
const apiUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";

const movieDetailsContainer = document.getElementById("movie-details");

// Получаем ID фильма из URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    fetchMovieDetails(movieId);
} else {
    movieDetailsContainer.innerHTML = '<p>No movie selected. <a href="index.html">Go back</a></p>';
}

function fetchMovieDetails(id) {
    fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(err => {
            movieDetailsContainer.innerHTML = `<p>Failed to load movie details. <a href="index.html">Go back</a></p>`;
        });
}

function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <div>
            <img src="${movie.poster_path ? imgUrl + movie.poster_path : 'img/no-poster.jpg'}" alt="${movie.title}" class="movie-poster-large" onerror="this.src='img/no-poster.jpg'">
            <h1 class="movie-title">${movie.title}</h1>
            <p class="movie-overview">${movie.overview || 'No overview available.'}</p>
            <button onclick="window.location.href='index.html'" class="back-button">Back to Movies</button>
        </div>
    `;
}