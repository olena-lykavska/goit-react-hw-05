import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Збереження поточного шляху для коректного повернення

  return (
    <ul className={css.list}>
      {movies.map(({ id, title }) => (
        <li key={id} className={css.item}>
          {/* Посилання на деталі фільму з передачею стану */}
          <Link to={`/movies/${id}`} state={{ from: location }} className={css.link}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
