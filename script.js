let apiKey = "450de2ccb3594f7792ac2434c91755ce"; 
let apiUrl = "https://api.themoviedb.org/3";
let imgUrl = "https://image.tmdb.org/t/p/w500";

let moviesGrid = document.querySelector(".movies-grid");
let searchForm = document.querySelector(".search-form");
let searchInput = document.querySelector(".search-input");

fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
  .then(res => res.json())
  .then(res => showMovies(res.results))
  .catch(err => showError("Failed to load movies"));

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = searchInput.value.trim();
  
  if (!query) {
    fetchPopularMovies();
    return;
  }
  
  fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(res => showMovies(res.results))
    .catch(err => showError("Search failed"));
});

function showError(message) {
  moviesGrid.innerHTML = `<p class="no-results">${message}. Please try again later.</p>`;
}

function popularMovies() {
  fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
    .then(res => res.json())
    .then(res => showMovies(res.results))
    .catch(err => showError("Failed to load movies"));
}

function showMovies(movies) {
  moviesGrid.innerHTML = '';
  
  if (movies.length === 0) {
    moviesGrid.innerHTML = '<p class="no-results">No movies found</p>';
    return;
  }
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    
    movieCard.innerHTML = `
      <img class="movie-poster" 
          src="${movie.poster_path ? imgUrl + movie.poster_path : 'img/no-poster.jpg'}" 
          alt="${movie.title}"
          onerror="this.src='img/no-poster.jpg'">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-release">${movie.release_date?.substring(0, 4) || 'N/A'}</p>
      <button class="movie-button">Add to Watchlist</button>
    `;
    
    movieCard.addEventListener('click', () => {
      window.location.href = `single.html?id=${movie.id}`;
    });
    
    moviesGrid.appendChild(movieCard);
  });
}