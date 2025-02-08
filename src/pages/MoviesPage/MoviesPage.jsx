// Імпортуємо необхідні хуки та компоненти з React та React Router
import { useState, useEffect } from "react"; // для управління станом та побічними ефектами
import { useSearchParams, Link } from "react-router-dom"; // для роботи з параметрами пошуку в URL та навігації
import { searchMovies } from "../../services/api"; // користувацька служба для пошуку фільмів
import styles from "./MoviesPage.module.css"; // CSS модуль для стилізації сторінки

function MoviesPage() {
  // Витягуємо параметри пошуку з URL
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Отримуємо значення пошукового запиту з URL, якщо воно є
  const [movies, setMovies] = useState([]); // Стейт для збереження списку фільмів
  const [error, setError] = useState(""); // Стейт для збереження помилки
  const [isLoading, setIsLoading] = useState(false); // Стейт для відслідковування завантаження даних

  // Хук useEffect для виконання пошуку фільмів при зміні query
  useEffect(() => {
    if (!query) return; // Якщо запит порожній, не робимо запит

    setIsLoading(true); // Встановлюємо стан завантаження
    setError(""); // Скидаємо попередні помилки

    // Викликаємо функцію пошуку фільмів
    searchMovies(query)
      .then((results) => {
        if (Array.isArray(results)) { // Перевіряємо, чи є результати у вигляді масиву
          setMovies(results); // Якщо так, оновлюємо список фільмів
        } else {
          throw new Error("Invalid data format"); // Якщо дані не є масивом, викидаємо помилку
        }
      })
      .catch(() => setError("Error fetching movies.")) // Обробка помилки, якщо запит не вдався
      .finally(() => setIsLoading(false)); // Завершуємо завантаження, незалежно від результату
  }, [query]); // Пошук перезапускається, якщо змінюється query

  // Обробник відправки форми пошуку фільмів
  const handleSubmit = (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    const form = event.target; // Отримуємо форму
    const searchTerm = form.elements.search.value.trim(); // Отримуємо значення пошукового терміну

    if (!searchTerm) { // Якщо пошуковий термін порожній, виводимо помилку
      setError("Please enter a search term.");
      return;
    }

    setError(""); // Скидаємо помилку
    setSearchParams({ query: searchTerm }); // Оновлюємо параметри пошуку в URL
  };

  return (
    <div className={styles.container}>
      {/* Форма для пошуку фільмів */}
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          defaultValue={query} // Підставляємо значення запиту в поле пошуку
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton} disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"} {/* Кнопка для пошуку, змінює текст на "Loading..." під час завантаження */}
        </button>
      </form>

      {/* Якщо є помилка, відображаємо повідомлення про помилку */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Якщо запит є, але немає результатів, виводимо повідомлення про відсутність фільмів */}
      {!isLoading && movies.length === 0 && query && <p className={styles.noResults}>No movies found.</p>}

      {/* Якщо є фільми, відображаємо їх список */}
      {movies.length > 0 && (
        <ul className={styles.movieList}>
          {movies.map(({ id, title }) => (
            <li key={id} className={styles.movieItem}>
              {/* Лінк на сторінку з деталями фільму */}
              <Link to={`/movies/${id}`} className={styles.movieLink}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;

