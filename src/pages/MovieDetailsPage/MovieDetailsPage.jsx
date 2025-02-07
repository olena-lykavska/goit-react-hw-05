// Імпортуємо необхідні хуки та компоненти з React та React Router
import { useParams, Link, Outlet, useNavigate } from "react-router-dom"; // для обробки маршрутизації та навігації
import { useEffect, useState } from "react"; // для управління станом та побічними ефектами
import { fetchMovieDetails } from "../../services/api"; // користувацька служба для отримання деталей фільму
import styles from "./MovieDetailsPage.module.css"; // CSS модуль для стилізації сторінки

function MovieDetailsPage() {
  // Витягуємо movieId з параметрів URL за допомогою хука useParams
  const { movieId } = useParams();
  // Ініціалізуємо хук useNavigate для програмної навігації
  const navigate = useNavigate();
  // useState хуки для управління даними фільму, станом завантаження та помилками
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Хук useEffect для отримання деталей фільму, коли movieId змінюється
  useEffect(() => {
    setLoading(true); // Встановлюємо стан завантаження
    setError(null); // Скидаємо попередні помилки

    // Викликаємо функцію fetchMovieDetails для отримання даних фільму з API
    fetchMovieDetails(movieId)
      .then((data) => {
        if (data && data.id) { // Перевіряємо, чи є в отриманих даних валідний id
          setMovie(data); // Встановлюємо отримані дані про фільм у стан
        } else {
          throw new Error("Movie not found"); // Якщо дані не валідні, викидаємо помилку
        }
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err); // Логуємо помилку для налагодження
        setError("Failed to load movie details."); // Встановлюємо повідомлення про помилку в інтерфейсі
      })
      .finally(() => setLoading(false)); // Завершуємо завантаження після виконання запиту
  }, [movieId]); // Залежність від movieId, щоб хук запускався при зміні movieId

  // Якщо фільм ще завантажується, показуємо повідомлення про завантаження
  if (loading) return <p className={styles.loading}>Loading...</p>;

  // Якщо сталася помилка при отриманні даних, показуємо повідомлення про помилку
  if (error) return <p className={styles.error}>{error}</p>;

  // Якщо дані про фільм відсутні, показуємо повідомлення, що фільм не знайдений
  if (!movie) return <p className={styles.noMovie}>No movie data available.</p>;

  // Якщо дані про фільм успішно отримано, рендеримо сторінку з його деталями
  return (
    <div className={styles.container}>
      {/* Кнопка для повернення на попередню сторінку */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Go back
      </button>
      <h1 className={styles.title}>{movie.title}</h1>
      {/* Виводимо постер фільму, якщо він є */}
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.jpg"}
        alt={movie.title}
        className={styles.image}
      />
      {/* Опис фільму */}
      <p className={styles.description}>{movie.overview}</p>
      <div className={styles.additionalInfo}>
        {/* Посилання на додаткову інформацію (акторів, відгуки) */}
        <Link to="cast" className={styles.link}>Cast</Link>
        <Link to="reviews" className={styles.link}>Reviews</Link>
      </div>

      {/* Виведення вкладених компонентів для додаткової інформації */}
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
