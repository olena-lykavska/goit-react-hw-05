import { useParams } from 'react-router-dom'; // Імпорт useParams для отримання параметра movieId з URL
import { useEffect, useState } from 'react'; // Імпорт useEffect для побічних ефектів та useState для управління станом
import { fetchMovieReviews } from '../../services/api'; // Імпорт функції для отримання рецензій на фільм
import styles from './MovieReviews.module.css'; // Імпорт модульних стилів

function MovieReviews() {
  const { movieId } = useParams(); // Отримуємо ідентифікатор фільму з параметрів маршруту
  const [reviews, setReviews] = useState([]); // Стан для збереження масиву рецензій

  useEffect(() => {
    fetchMovieReviews(movieId) // Викликаємо API-запит для отримання рецензій за movieId
      .then(setReviews) // Оновлюємо стан отриманими рецензіями
      .catch(console.error); // Ловимо та виводимо помилки у консоль
  }, [movieId]); // Ефект залежить від зміни movieId

  return (
    <div className={styles.reviewsContainer}> {/* Основний контейнер для рецензій */}
      <h2 className={styles.heading}>Reviews</h2> {/* Заголовок секції */}

      {reviews.length > 0 ? ( // Перевіряємо, чи є рецензії
        <ul className={styles.reviewList}> {/* Список рецензій */}
          {reviews.map((review) => ( // Перебираємо масив рецензій
            <li key={review.id} className={styles.reviewItem}> {/* Елемент списку */}
              <p className={styles.reviewText}>
                <strong className={styles.author}>{review.author}</strong>: {/* Автор рецензії */}
                {review.content} {/* Текст рецензії */}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>No reviews available</p> // Повідомлення, якщо рецензій немає
      )}
    </div>
  );
}

export default MovieReviews; // Експортуємо компонент для використання в інших частинах застосунку
