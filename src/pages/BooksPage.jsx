import { useState, useMemo } from 'react'
import { useBooks } from '../hooks/useBooks'
import { ALL_GENRES } from '../utils/constants'
import BookFilters from '../components/books/BookFilters'
import BookList from '../components/books/BookList'
import BookForm from '../components/books/BookForm'
import Modal from '../components/ui/Modal'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import styles from './BooksPage.module.css'

export default function BooksPage() {
  const { books, loading, saving, error, loadBooks, addBook, editBook, removeBook } =
    useBooks()

  // ---- UI state (separate from data state, which lives in the hook) ----
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null) // book being edited, or null for "add"

  // ---- Derived data: filter by search text + genre ----
  // useMemo avoids re-filtering on every unrelated render.
  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase()
    return books.filter((book) => {
      const matchesGenre = genre === ALL_GENRES || book.genre === genre
      const matchesSearch =
        !term ||
        book.title?.toLowerCase().includes(term) ||
        book.author?.toLowerCase().includes(term)
      return matchesGenre && matchesSearch
    })
  }, [books, search, genre])

  // ---- Handlers ----
  const openAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (book) => {
    setEditing(book)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSubmit = async (values) => {
    try {
      if (editing) {
        await editBook(editing.id, values)
      } else {
        await addBook(values)
      }
      closeModal() // only closes if the request succeeded (hook throws on error)
    } catch {
      // Error is surfaced by the hook's error state; keep the modal open.
    }
  }

  const handleDelete = (book) => {
    // Confirmation is handled inline inside BookCard, so by the time this
    // runs the user has already confirmed — just delete.
    removeBook(book.id)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Personal Library</p>
          <h1 className={styles.title}>Bibliotheca</h1>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>
          + Add book
        </button>
      </header>

      {/* Inline error banner for add/edit/delete failures (list still visible) */}
      {error && !loading && (
        <div className={styles.inlineError}>{error}</div>
      )}

      {loading ? (
        <Loader label="Gathering your library…" />
      ) : error && books.length === 0 ? (
        <ErrorMessage message={error} onRetry={loadBooks} />
      ) : (
        <>
          <BookFilters
            search={search}
            onSearchChange={setSearch}
            genre={genre}
            onGenreChange={setGenre}
            resultCount={filteredBooks.length}
          />
          <BookList
            books={filteredBooks}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Edit book' : 'Add a new book'}
        onClose={closeModal}
      >
        <BookForm
          initialBook={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          saving={saving}
        />
      </Modal>
    </div>
  )
}