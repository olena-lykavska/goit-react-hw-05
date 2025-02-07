import { useEffect, useState } from "react"; // Імпортуємо хуки для управління станом та ефектами
import { fetchTrendingMovies } from "../../services/api"; // Імпортуємо функцію для отримання списку популярних фільмів
import { Link } from "react-router-dom"; // Імпортуємо Link для навігації між сторінками
import styles from "./HomePage.module.css"; // Імпортуємо модульні стилі

function HomePage() {
  // Стейт для збереження списку фільмів
  const [movies, setMovies] = useState([]);
  // Стейт для індикації завантаження
  const [loading, setLoading] = useState(false);
  // Стейт для збереження можливих помилок
  const [error, setError] = useState(null);

  // Виконується один раз при завантаженні сторінки
  useEffect(() => {
    setLoading(true); // Починаємо завантаження
    setError(null); // Скидаємо попередні помилки

    fetchTrendingMovies() // Викликаємо функцію для отримання даних
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data); // Оновлюємо список фільмів, якщо дані у правильному форматі
        } else {
          throw new Error("Unexpected API response format"); // Якщо формат некоректний, викликаємо помилку
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error); // Логуємо помилку в консоль
        setError("Failed to load movies. Please try again later."); // Встановлюємо повідомлення про помилку для відображення користувачеві
      })
      .finally(() => setLoading(false)); // Завершуємо завантаження
  }, []);

  return (
    <div className={styles.container}> {/* Основний контейнер сторінки */}
      <h1 className={styles.heading}>Trending Movies</h1> {/* Заголовок */}

      {/* Відображення стану завантаження */}
      {loading && <p className={styles.loading}>Loading...</p>}

      {/* Відображення повідомлення про помилку */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Відображаємо список фільмів, якщо немає помилок і фільми є */}
      {!loading && !error && (
        movies.length > 0 ? (
          <ul className={styles.list}> {/* Список фільмів */}
            {movies.map((movie) => (
              <li key={movie.id} className={styles.listItem}> {/* Окремий елемент списку */}
                <Link to={`/movies/${movie.id}`} className={styles.link}> {/* Посилання на сторінку фільму */}
                  {movie.title} {/* Назва фільму */}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noMovies}>No trending movies available.</p> // Повідомлення, якщо список порожній
        )
      )}
    </div>
  );
}

export default HomePage;