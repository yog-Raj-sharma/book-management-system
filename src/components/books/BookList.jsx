import BookCard from './BookCard'
import styles from './BookList.module.css'

// Presentational: receives the (already filtered) list and passes
// through the edit/delete callbacks to each card.
export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No books match.</p>
        <p className={styles.emptyHint}>
          Try a different search, clear the genre filter, or add a new book.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {books.map((book, i) => (
        <BookCard
          key={book.id}
          book={book}
          index={i}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}