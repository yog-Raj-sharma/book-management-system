import { useState } from 'react'
import styles from './BookCard.module.css'

// Presentational, with one small piece of local UI state: whether the
// delete confirmation is showing. The actual delete still happens via the
// onDelete callback passed from the page — this only controls the trigger.
export default function BookCard({ book, onEdit, onDelete, index = 0 }) {
  const [confirming, setConfirming] = useState(false)

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

      {confirming ? (
        <div className={styles.confirm}>
          <span className={styles.confirmText}>Delete this book?</span>
          <div className={styles.confirmActions}>
            <button
              className={styles.cancelConfirm}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
            <button
              className={styles.confirmDelete}
              onClick={() => onDelete(book)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.actions}>
          <button className={styles.edit} onClick={() => onEdit(book)}>
            Edit
          </button>
          <button className={styles.delete} onClick={() => setConfirming(true)}>
            Delete
          </button>
        </div>
      )}
    </article>
  )
}