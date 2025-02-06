import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../../services/api";  // Імпортуємо функцію для пошуку фільмів
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(""); // Стейт для помилки
  const [isLoading, setIsLoading] = useState(false); // Стейт для індикації завантаження

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const searchTerm = form.elements.search.value.trim();

    if (!searchTerm) {
      setError("Please enter a search term.");
      return;
    }

    setError(""); // Очищаємо повідомлення про помилку при введенні тексту
    setIsLoading(true);
    setSearchParams({ query: searchTerm });

    try {
      const results = await searchMovies(searchTerm);  // Викликаємо функцію для пошуку фільмів
      if (results.length === 0) {
        setError("No movies found.");
      }
      setMovies(results);
    } catch (error) {
      setError("Error fetching movies.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          defaultValue={query}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;
