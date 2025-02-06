import { NavLink } from 'react-router-dom';

// Імпорт стилів (CSS-модулі)
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        {/* Посилання на головну сторінку */}
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? css.active : css.link)}>
            Home
          </NavLink>
        </li>

        {/* Посилання на сторінку пошуку фільмів */}
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? css.active : css.link)}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
