import { useParams } from 'react-router-dom'; // Імпортуємо хук useParams для отримання параметрів URL
import { useEffect, useState } from 'react'; // Імпортуємо хуки useEffect і useState для управління станом і побічними ефектами
import { fetchMovieCast } from '../../services/api'; // Імпортуємо функцію для отримання акторського складу з API
import styles from './MovieCast.module.css'; // Імпортуємо стилі для компонента

function MovieCast() {
  const { movieId } = useParams(); // Отримуємо movieId з параметрів URL
  const [cast, setCast] = useState([]); // Створюємо стан для збереження списку акторів
  
  // Базовий URL для завантаження зображень акторів
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchMovieCast(movieId) // Викликаємо функцію для отримання акторського складу
      .then(setCast) // Оновлюємо стан cast отриманими даними
      .catch(console.error); // Логування помилок у разі невдалого запиту
  }, [movieId]); // Ефект спрацьовує щоразу при зміні movieId

  return (
    <div className={styles.castContainer}> {/* Контейнер для всього компонента */}
      <h2>Cast</h2> {/* Заголовок секції */}
      {cast.length > 0 ? ( // Перевіряємо, чи є акторський склад
        <div className={styles.castList}> {/* Контейнер для списку акторів */}
          {cast
            .filter(actor => actor.profile_path) // Фільтруємо акторів без фото
            .map((actor) => (
              <div key={actor.id} className={styles.actorCard}> {/* Карточка актора */}
                <img 
                  src={`${IMAGE_BASE_URL}${actor.profile_path}`} // Формуємо URL для фото актора
                  alt={actor.name} // Додаємо альтернативний текст для доступності
                  className={styles.actorPhoto} // Додаємо стилі для зображення актора
                />
                <p>{actor.name}</p> {/* Ім'я актора */}
                <p>{actor.character}</p> {/* Роль актора у фільмі */}
              </div>
            ))}
        </div>
      ) : (
        <p>No cast available</p> // Відображаємо повідомлення, якщо акторський склад відсутній
      )}
    </div>
  );
}

export default MovieCast; // Експортуємо компонент для використання в інших частинах додатка
