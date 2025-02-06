import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api"; 
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()  
      .then(setMovies)
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Trending Movies</h1>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.listItem}>
            <Link to={`/movies/${movie.id}`} className={styles.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
