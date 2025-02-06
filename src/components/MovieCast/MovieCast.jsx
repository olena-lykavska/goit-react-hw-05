// src/components/MovieCast/MovieCast.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/api';

// Імпортуємо CSS-модуль
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  
  // Базовий URL для зображень акторів
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch(console.error);
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <div className={styles.castList}>
          {cast
            .filter(actor => actor.profile_path) // Фільтруємо акторів без фото
            .map((actor) => (
              <div key={actor.id} className={styles.actorCard}>
                <img 
                  src={`${IMAGE_BASE_URL}${actor.profile_path}`} 
                  alt={actor.name} 
                  className={styles.actorPhoto} 
                />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>No cast available</p>
      )}
    </div>
  );
}

export default MovieCast;
