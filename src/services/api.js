import axios from "axios";

// Токен доступу
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjhhODYxYWJjMjdlYmYwOTRlMTRkOGUwN2FhZmZlYiIsIm5iZiI6MTczODg0NzM0Mi41Nzc5OTk4LCJzdWIiOiI2N2E0YjQ2ZTg4NThjODcwNWE2NmU5NDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sJd_p0fJWoU819H4rOsD0mZ9OFVVM9iVDOa0Fh9vIw8';

// Базовий URL для API TMDB
const BASE_URL = "https://api.themoviedb.org/3";

// Функція для отримання популярних фільмів
export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/week?api_key=${ACCESS_TOKEN}`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results; // Повертає масив з популярними фільмами
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Функція для пошуку фільмів за запитом
export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${ACCESS_TOKEN}&query=${query}`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results; // Повертає масив знайдених фільмів
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// Функція для отримання деталей фільму
export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${ACCESS_TOKEN}`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data; // Повертає деталі фільму
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Додаємо функцію для отримання рецензій
export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${ACCESS_TOKEN}`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results; // Повертає масив рецензій
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

// Додаємо функцію для отримання акторського складу
export const fetchMovieCast = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${ACCESS_TOKEN}`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.cast; // Повертає масив акторів
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};
