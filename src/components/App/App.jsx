import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './App.module.css';

// Використовуємо React.lazy для поділу коду (відкладене завантаження сторінок)
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));


const App = () => {
  return (
    <div className={styles.container}>
      {/* Компонент навігації */}
      <Navigation />

      {/* Обгортка Suspense для завантаження сторінок асинхронно */}
      <Suspense fallback={<div className={styles.loading}>Завантаження...</div>}>
        <Routes>
          {/* Головна сторінка (список популярних фільмів) */}
          <Route path="/" element={<HomePage />} />

          {/* Сторінка пошуку фільмів */}
          <Route path="/movies" element={<MoviesPage />} />

          {/* Детальна інформація про фільм */}
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          {/* Сторінка 404 (якщо маршрут не знайдено) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
