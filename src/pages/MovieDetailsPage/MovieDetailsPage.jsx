import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom"; 
import { useEffect, useState, useRef } from "react"; // імпортуємо useRef
import { fetchMovieDetails } from "../../services/api"; // функція для отримання деталей фільму
import styles from "./MovieDetailsPage.module.css"; // імпортуємо стилі

function MovieDetailsPage() {
  const { movieId } = useParams(); // отримуємо ID фільму з URL
  const navigate = useNavigate(); // хук для навігації
  const location = useLocation(); // хук для отримання поточного місця в URL

  // useRef для збереження шляху назад (якщо є)
  const goBackPathRef = useRef(location.state?.from || "/");

  const [movie, setMovie] = useState(null); // стан для зберігання даних про фільм
  const [loading, setLoading] = useState(false); // стан для відслідковування завантаження
  const [error, setError] = useState(null); // стан для обробки помилок

  // ефект для завантаження даних про фільм після зміни movieId
  useEffect(() => {
    setLoading(true); // включаємо індикатор завантаження
    setError(null); // скидаємо помилки

    fetchMovieDetails(movieId) // запит на отримання деталей фільму
      .then((data) => {
        if (data && data.id) {
          setMovie(data); // зберігаємо дані про фільм
        } else {
          throw new Error("Movie not found"); // обробка помилки, якщо фільм не знайдений
        }
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details."); // обробка помилки завантаження
      })
      .finally(() => setLoading(false)); // вимикаємо індикатор завантаження
  }, [movieId]); // ефект викликається при зміні movieId

  // Рендеринг в залежності від стану завантаження, помилок чи відсутності даних
  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.noMovie}>No movie data available.</p>;

  return (
    <div className={styles.container}>
      {/* Кнопка для повернення назад */}
      <button onClick={() => navigate(goBackPathRef.current)} className={styles.backButton}>
        Go back
      </button>

      <h1 className={styles.title}>{movie.title}</h1> {/* Заголовок фільму */}

      {/* Зображення постера фільму */}
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.jpg"}
        alt={movie.title}
        className={styles.image}
      />

      <p className={styles.description}>{movie.overview}</p> {/* Опис фільму */}

      <div className={styles.additionalInfo}>
        {/* Посилання на додаткову інформацію */}
        <Link to="cast" className={styles.link}>Cast</Link>
        <Link to="reviews" className={styles.link}>Reviews</Link>
      </div>

      <Outlet /> {/* Виведення вкладених компонентів */}
    </div>
  );
}

export default MovieDetailsPage;
