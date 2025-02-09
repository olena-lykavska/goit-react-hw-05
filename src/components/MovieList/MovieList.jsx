import { Link, useLocation } from "react-router-dom"; // Імпортуємо компоненти Link і хук useLocation з бібліотеки react-router-dom для маршрутизації та доступу до поточного шляху.
import styles from "./MovieList.module.css"; // Імпортуємо CSS модулі для стилізації компонента.

function MovieList({ movies }) { // Функціональний компонент MovieList приймає список фільмів як пропс.
  const location = useLocation(); // Використовуємо хук useLocation, щоб отримати поточне місцезнаходження (шлях) на сторінці. Це необхідно, щоб зберегти інформацію про поточну сторінку при переході на іншу.

  return (
    <ul className={styles.list}> {/* Створюємо список фільмів і застосовуємо стилі з CSS-модуля для елемента списку. */}
      {movies.map(({ id, title }) => ( // Перебираємо кожен фільм із масиву movies.
        <li key={id} className={styles.listItem}> {/* Для кожного фільму створюємо елемент списку, використовуючи його id як унікальний ключ. */}
          <Link to={`/movies/${id}`} state={{ from: location }} className={styles.link}> {/* Створюємо посилання на сторінку фільму, передаючи state з поточним місцезнаходженням. */}
            {title} {/* Виводимо назву фільму в посиланні. */}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
