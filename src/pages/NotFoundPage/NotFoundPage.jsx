import { Link } from "react-router-dom"; // Імпортуємо необхідні компоненти з React Router для навігації
import styles from "./NotFoundPage.module.css"; // Імпортуємо CSS модуль для стилізації сторінки

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      {/* Заголовок сторінки, що повідомляє про помилку 404 */}
      <h2 className={styles.notFoundTitle}>404 - Page Not Found</h2>
      {/* Текст повідомлення про відсутність сторінки */}
      <p className={styles.notFoundText}>Sorry, the page you are looking for does not exist.</p>
      {/* Лінк для повернення на головну сторінку */}
      <Link to="/" className={styles.notFoundLink}>Go back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
