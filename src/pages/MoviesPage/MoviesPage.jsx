import { useState, useEffect } from "react"; // Імпортуємо хуки useState та useEffect з React для управління станом і виконання побічних ефектів.
import { useSearchParams } from "react-router-dom"; // Імпортуємо хук useSearchParams для роботи з параметрами пошукового запиту в URL.
import { searchMovies } from "../../services/api"; // Імпортуємо функцію searchMovies для пошуку фільмів через API.
import MovieList from "../../components/MovieList/MovieList"; // Імпортуємо компонент MovieList для відображення знайдених фільмів.
import styles from "./MoviesPage.module.css"; // Імпортуємо CSS модулі для стилізації сторінки.

function MoviesPage() { // Функціональний компонент MoviesPage.
  const [searchParams, setSearchParams] = useSearchParams(); // Використовуємо хук для отримання параметрів пошуку з URL та функції для їх оновлення.
  const query = searchParams.get("query") || ""; // Отримуємо значення параметра "query" з URL або задаємо пустий рядок за замовчуванням.
  const [movies, setMovies] = useState([]); // Створюємо стан для зберігання знайдених фільмів.
  const [error, setError] = useState(""); // Створюємо стан для обробки помилок.
  const [isLoading, setIsLoading] = useState(false); // Створюємо стан для індикації процесу завантаження.

  useEffect(() => { // Використовуємо хук useEffect для виконання функції пошуку фільмів кожного разу, коли змінюється параметр "query".
    if (!query) return; // Якщо немає запиту на пошук, то не виконуємо пошук.

    setIsLoading(true); // Починаємо завантаження.
    setError(""); // Скидаємо попередню помилку.

    searchMovies(query) // Викликаємо функцію searchMovies, передаючи поточний пошуковий запит.
      .then((results) => { // Якщо пошук успішний:
        if (Array.isArray(results)) { // Перевіряємо, чи результат є масивом.
          setMovies(results); // Якщо так, оновлюємо стан movies.
        } else {
          throw new Error("Invalid data format"); // Якщо формат даних неправильний, генеруємо помилку.
        }
      })
      .catch(() => setError("Error fetching movies.")) // Якщо сталася помилка під час запиту, встановлюємо відповідне повідомлення про помилку.
      .finally(() => setIsLoading(false)); // Незалежно від результату, зупиняємо індикацію завантаження.
  }, [query]); // Залежність від query, щоб ефект виконувався кожного разу при зміні пошукового запиту.

  const handleSubmit = (event) => { // Обробник відправки форми.
    event.preventDefault(); // Скасовуємо стандартну поведінку форми (перезавантаження сторінки).
    const form = event.target; // Отримуємо саму форму.
    const searchTerm = form.elements.search.value.trim(); // Отримуємо значення пошукового запиту з поля input і видаляємо зайві пробіли.

    if (!searchTerm) { // Якщо пошуковий запит порожній:
      setError("Please enter a search term."); // Встановлюємо помилку, що потрібно ввести термін для пошуку.
      return;
    }

    setError(""); // Якщо запит є, скидаємо помилку.
    setSearchParams({ query: searchTerm }); // Оновлюємо параметри пошукового запиту в URL.
  };

  return (
    <div className={styles.container}> {/* Основний контейнер для сторінки. */}
      <form onSubmit={handleSubmit}> {/* Форма для введення пошукового запиту. */}
        <input
          name="search" // Поле вводу для пошукового запиту.
          defaultValue={query} // Встановлюємо значення поля вводу на основі поточного запиту.
          placeholder="Search for movies..." // Текст-підказка в полі вводу.
          className={styles.searchInput} // Застосовуємо стилі до поля вводу.
        />
        <button type="submit" className={styles.searchButton} disabled={isLoading}> {/* Кнопка для відправки форми. */}
          {isLoading ? "Loading..." : "Search"} {/* Показуємо "Loading..." під час завантаження, інакше текст "Search". */}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>} {/* Якщо є помилка, відображаємо її. */}
      {!isLoading && movies.length === 0 && query && <p className={styles.noResults}>No movies found.</p>} {/* Якщо немає результатів, показуємо повідомлення, що фільмів не знайдено. */}

      {movies.length > 0 && <MovieList movies={movies} />} {/* Якщо є знайдені фільми, відображаємо їх за допомогою компонента MovieList. */}
    </div>
  );
}

export default MoviesPage;