import { Link, useLocation } from "react-router-dom"; // Імпортуємо Link для навігації та useLocation для збереження поточного місця розташування
import styles from "./MovieList.module.css"; // Імпортуємо модульні стилі

// Компонент MovieList отримує список фільмів як пропс
const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримуємо поточне місцезнаходження сторінки для коректного повернення назад

  // Перевіряємо, чи movies є масивом, інакше виводимо повідомлення про помилку
  if (!Array.isArray(movies)) {
    return <p className={styles.error}>No movies available</p>;
  }

  return (
    <ul className={styles.list}>
      {/* Проходимо по масиву фільмів і рендеримо кожен елемент */}
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          {/* Створюємо посилання на сторінку конкретного фільму */}
          <Link 
            to={`/movies/${id}`} 
            state={{ from: location }} // Зберігаємо місце, звідки прийшли, для коректного переходу назад
            className={styles.link}
          >
            {title} {/* Виводимо назву фільму */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
