import { useParams } from "react-router-dom"; // Імпортуємо useParams для отримання параметра movieId з URL
import { useEffect, useState } from "react"; // Імпортуємо хуки для керування станом та ефектами
import { fetchMovieReviews } from "../../services/api"; // Імпортуємо функцію для отримання рецензій на фільм
import styles from "./MovieReviews.module.css"; // Імпортуємо модульні стилі

function MovieReviews() {
  const { movieId } = useParams(); // Отримуємо ідентифікатор фільму з URL
  const [reviews, setReviews] = useState([]); // Стейт для збереження списку рецензій
  const [loading, setLoading] = useState(false); // Стейт для індикації завантаження
  const [error, setError] = useState(null); // Стейт для збереження повідомлення про помилку

  useEffect(() => {
    setLoading(true); // Встановлюємо стан завантаження
    setError(null); // Очищаємо помилку перед новим запитом

    fetchMovieReviews(movieId) // Викликаємо функцію для отримання рецензій
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data); // Якщо відповідь є масивом, зберігаємо її у стан
        } else {
          throw new Error("Invalid data format"); // Якщо дані некоректні, викликаємо помилку
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error); // Логування помилки
        setError("Failed to load reviews."); // Встановлюємо повідомлення про помилку
      })
      .finally(() => setLoading(false)); // Завершуємо завантаження
  }, [movieId]); // Виконуємо ефект при зміні movieId

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.heading}>Reviews</h2>

      {/* Відображаємо повідомлення про завантаження */}
      {loading && <p>Loading...</p>}
      
      {/* Відображаємо повідомлення про помилку, якщо є */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Якщо дані завантажено та немає помилки */}
      {!loading && !error && (
        reviews.length > 0 ? (
          <ul className={styles.reviewList}>
            {/* Перебираємо масив рецензій та виводимо кожну */}
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <p className={styles.reviewText}>
                  <strong className={styles.author}>{review.author}</strong>: {review.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          // Якщо рецензій немає
          <p className={styles.noReviews}>No reviews available</p>
        )
      )}
    </div>
  );
}

export default MovieReviews;
