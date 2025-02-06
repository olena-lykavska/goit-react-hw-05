import { useParams, Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => window.history.back()} className={styles.backButton}>
        Go back
      </button>
      <h1 className={styles.title}>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className={styles.image} />
      <p className={styles.description}>{movie.overview}</p>
      <div className={styles.additionalInfo}>
        <Link to="cast" className={styles.link}>
          Cast
        </Link>
        <Link to="reviews" className={styles.link}>
          Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
