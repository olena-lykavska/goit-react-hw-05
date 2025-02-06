import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
      <p className={styles.notFoundText}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.notFoundLink}>Go back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
