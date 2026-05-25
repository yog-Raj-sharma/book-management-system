import styles from './BookCard.module.css'

// Presentational: receives a book and two callbacks. Holds no state.
export default function BookCard({ book, onEdit, onDelete, index = 0 }) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      <div className={styles.genre}>{book.genre}</div>

      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>by {book.author}</p>

      <div className={styles.meta}>
        <span className={styles.year}>{book.year}</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(book)}>
          Edit
        </button>
        <button className={styles.delete} onClick={() => onDelete(book)}>
          Delete
        </button>
      </div>
    </article>
  )
}