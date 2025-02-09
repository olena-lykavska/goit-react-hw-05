import { useEffect, useState } from "react"; // Імпортуємо хук useEffect для виконання побічних ефектів та useState для управління станом компонентів.
import { fetchTrendingMovies } from "../../services/api"; // Імпортуємо функцію fetchTrendingMovies, яка отримує список трендових фільмів з API.
import MovieList from "../../components/MovieList/MovieList"; // Імпортуємо компонент MovieList для відображення списку фільмів.
import styles from "./HomePage.module.css"; // Імпортуємо CSS-модулі для стилізації сторінки.

function HomePage() { // Функціональний компонент HomePage.
  const [movies, setMovies] = useState([]); // Створюємо стан для зберігання фільмів.
  const [loading, setLoading] = useState(false); // Створюємо стан для індикації процесу завантаження.
  const [error, setError] = useState(null); // Створюємо стан для обробки помилок.

  useEffect(() => { // Використовуємо хук useEffect для того, щоб виконати функцію після рендеру компонента.
    setLoading(true); // Починаємо завантаження (ставимо loading в true).
    setError(null); // Скидаємо попередню помилку (якщо така була).

    fetchTrendingMovies() // Викликаємо функцію для отримання даних про трендові фільми.
      .then((data) => { // Якщо API повертає дані:
        if (Array.isArray(data)) { // Перевіряємо, чи дані є масивом.
          setMovies(data); // Якщо так, оновлюємо стан movies.
        } else {
          throw new Error("Unexpected API response format"); // Якщо формат не відповідає очікуванням, генеруємо помилку.
        }
      })
      .catch(() => setError("Failed to load movies. Please try again later.")) // Якщо сталася помилка при отриманні даних, встановлюємо повідомлення про помилку.
      .finally(() => setLoading(false)); // Незалежно від результату, зупиняємо індикацію завантаження.
  }, []); // Використовуємо порожній масив як залежність, щоб цей ефект виконувався лише один раз при першому рендері.

  return (
    <div className={styles.container}> {/* Основний контейнер для сторінки. */}
      <h1 className={styles.heading}>Trending Movies</h1> {/* Заголовок сторінки, що відображає текст "Trending Movies". */}

      {loading && <p className={styles.loading}>Loading...</p>} {/* Якщо триває завантаження, показуємо повідомлення "Loading..." */}
      {error && <p className={styles.error}>{error}</p>} {/* Якщо сталася помилка, відображаємо повідомлення про помилку. */}

      {!loading && !error && ( // Якщо немає помилки та завантаження завершено:
        movies.length > 0 ? ( // Якщо є фільми:
          <MovieList movies={movies} /> // Відображаємо список фільмів.
        ) : (
          <p className={styles.noMovies}>No trending movies available.</p> // Якщо немає фільмів, показуємо повідомлення "No trending movies available."
        )
      )}
    </div>
  );
}

export default HomePage;
