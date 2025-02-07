import { NavLink } from 'react-router-dom'; // Імпортуємо NavLink для створення навігаційних посилань
import styles from './Navigation.module.css'; // Імпортуємо модульні стилі

const Navigation = () => {
  return (
    <nav className={styles.nav}> {/* Основний контейнер навігації */}
      <ul className={styles.list}> {/* Невпорядкований список для елементів меню */}
        
        {/* Посилання на головну сторінку */}
        <li>
          <NavLink 
            to="/" // Вказуємо шлях до головної сторінки
            className={({ isActive }) => (isActive ? styles.active : styles.link)} // Додаємо стиль активного посилання
          >
            Home {/* Текст посилання */}
          </NavLink>
        </li>

        {/* Посилання на сторінку пошуку фільмів */}
        <li>
          <NavLink 
            to="/movies" // Вказуємо шлях до сторінки фільмів
            className={({ isActive }) => (isActive ? styles.active : styles.link)} // Аналогічно додаємо стиль для активного посилання
          >
            Movies {/* Текст посилання */}
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;
