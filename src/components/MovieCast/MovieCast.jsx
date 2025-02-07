import { useParams } from "react-router-dom"; // Імпортуємо useParams для отримання movieId з URL
import { useEffect, useState } from "react"; // Імпортуємо хуки useEffect та useState для управління станом
import { fetchMovieCast } from "../../services/api"; // Імпортуємо функцію для отримання акторського складу
import styles from "./MovieCast.module.css"; // Імпортуємо CSS модуль для стилізації компонента

function MovieCast() {
  // Отримуємо movieId з параметрів маршруту
  const { movieId } = useParams();

  // Створюємо стан для зберігання списку акторів
  const [cast, setCast] = useState([]);
  // Створюємо стан для індикації процесу завантаження
  const [loading, setLoading] = useState(false);
  // Створюємо стан для збереження повідомлення про помилку
  const [error, setError] = useState(null);

  // Базовий URL для завантаження зображень акторів
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // Використовуємо useEffect для отримання акторського складу після завантаження компонента
  useEffect(() => {
    setLoading(true); // Встановлюємо стан завантаження
    setError(null); // Очищаємо помилки перед новим запитом

    // Викликаємо API для отримання списку акторів
    fetchMovieCast(movieId)
      .then((data) => {
        // Перевіряємо, чи отримані дані є масивом
        if (Array.isArray(data)) {
          setCast(data); // Оновлюємо стан акторського складу
        } else {
          throw new Error("Invalid data format"); // Генеруємо помилку, якщо формат даних неправильний
        }
      })
      .catch((error) => {
        console.error("Error fetching cast:", error); // Лог помилки у консоль
        setError("Failed to load cast."); // Оновлюємо стан помилки
      })
      .finally(() => setLoading(false)); // Вимикаємо стан завантаження незалежно від результату
  }, [movieId]); // Виконуємо ефект щоразу, коли змінюється movieId

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>

      {/* Відображаємо повідомлення про завантаження */}
      {loading && <p>Loading...</p>}

      {/* Відображаємо повідомлення про помилку, якщо вона є */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Відображаємо акторський склад тільки якщо немає помилки та завершилося завантаження */}
      {!loading && !error && (
        cast.length > 0 ? (
          <div className={styles.castList}>
            {cast
              .filter(actor => actor.profile_path) // Фільтруємо тільки акторів, у яких є фото
              .map((actor) => (
                <div key={actor.id} className={styles.actorCard}>
                  <img 
                    src={`${IMAGE_BASE_URL}${actor.profile_path}`} // Підставляємо URL зображення
                    alt={actor.name} 
                    className={styles.actorPhoto} 
                  />
                  <p>{actor.name}</p> {/* Відображаємо ім'я актора */}
                  <p>{actor.character}</p> {/* Відображаємо роль актора */}
                </div>
              ))}
          </div>
        ) : (
          <p>No cast available</p> // Повідомлення, якщо список акторів порожній
        )
      )}
    </div>
  );
}

export default MovieCast;
