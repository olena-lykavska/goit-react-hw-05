import { Link, useLocation } from 'react-router-dom'; // Імпорт Link для навігації та useLocation для збереження поточного шляху
import styles from './MovieList.module.css'; // Імпорт стилів

// Компонент MovieList приймає масив фільмів через проп `movies`
const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримання поточного місця розташування (URL), щоб правильно обробити повернення назад

  return (
    <ul className={styles.list}> {/* Контейнерний елемент списку */}
      {movies.map(({ id, title }) => ( // Ітеруємо масив фільмів
        <li key={id} className={styles.item}> {/* Кожен фільм рендериться як елемент списку */}
          {/* Створюємо посилання на сторінку фільму, передаючи `state` для збереження попереднього місця */}
          <Link to={`/movies/${id}`} state={{ from: location }} className={styles.link}>
            {title} {/* Відображення назви фільму */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList; // Експортуємо компонент для використання в інших частинах застосунку
