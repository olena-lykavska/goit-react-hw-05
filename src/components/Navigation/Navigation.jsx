import { NavLink } from 'react-router-dom'; // Імпортуємо NavLink для створення навігаційних посилань
import styles from './Navigation.module.css'; // Імпортуємо модульні стилі

const Navigation = () => {
  return (
    <nav className={styles.nav}> {/* Основний контейнер навігації */}
      <ul className={styles.list}> {/* Невпорядкований список для елементів меню */}
        
        {/* Посилання на головну сторінку */}
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? styles.active : styles.link)} // Додаємо активний клас, якщо посилання активне
          >
            Home
          </NavLink>
        </li>

        {/* Посилання на сторінку пошуку фільмів */}
        <li>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => (isActive ? styles.active : styles.link)} // Аналогічно додаємо клас для активного посилання
          >
            Movies
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation; // Експортуємо компонент для використання в інших частинах застосунку
