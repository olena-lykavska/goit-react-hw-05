// Імпортуємо необхідні хуки та компоненти з React та React Router
import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom"; // useLocation для коректного повернення назад
import { useEffect, useState } from "react"; // для управління станом та побічними ефектами
import { fetchMovieDetails } from "../../services/api"; // користувацька служба для отримання деталей фільму
import styles from "./MovieDetailsPage.module.css"; // CSS модуль для стилізації сторінки

function MovieDetailsPage() {
  const { movieId } = useParams(); // Витягуємо movieId з параметрів URL
  const navigate = useNavigate(); // Ініціалізуємо useNavigate для програмної навігації
  const location = useLocation(); // Отримуємо поточне місцезнаходження
  
  // useState для збереження інформації про фільм, стан завантаження та помилки
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Змінна для збереження шляху повернення (або Home, або Movies)
  const goBackPath = location.state?.from || "/";

  // Хук useEffect для отримання деталей фільму, коли movieId змінюється
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMovieDetails(movieId)
      .then((data) => {
        if (data && data.id) {
          setMovie(data);
        } else {
          throw new Error("Movie not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.noMovie}>No movie data available.</p>;

  return (
    <div className={styles.container}>
      {/* Кнопка для повернення на сторінку, звідки прийшли */}
      <button onClick={() => navigate(goBackPath)} className={styles.backButton}>
        Go back
      </button>

      <h1 className={styles.title}>{movie.title}</h1>

      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.jpg"}
        alt={movie.title}
        className={styles.image}
      />

      <p className={styles.description}>{movie.overview}</p>

      <div className={styles.additionalInfo}>
        <Link to="cast" className={styles.link}>Cast</Link>
        <Link to="reviews" className={styles.link}>Reviews</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
