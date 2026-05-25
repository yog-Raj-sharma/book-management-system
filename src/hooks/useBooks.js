import { useState, useEffect, useCallback } from 'react'
import * as booksApi from '../api/booksApi'

/**
 * useBooks
 * --------
 * The single source of truth for book data and operations. Components never
 * call the API directly — they call these functions and read this state.
 *
 * Returns:
 *   books      - array of books currently loaded
 *   loading    - true while the initial list is being fetched
 *   error      - a user-facing error message, or null
 *   saving     - true while an add/edit/delete request is in flight
 *   loadBooks  - refetch the list (also used to retry after an error)
 *   addBook    - create a book
 *   editBook   - update a book by id
 *   removeBook - delete a book by id
 */
export function useBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const loadBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await booksApi.getBooks()
      setBooks(data)
    } catch (err) {
      setError('Could not load books. Please check your connection and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const addBook = async (book) => {
    setSaving(true)
    setError(null)
    try {
      const created = await booksApi.createBook(book)
      setBooks((prev) => [created, ...prev])
      return created
    } catch (err) {
      setError('Could not add the book. Please try again.')
      console.error(err)
      throw err
    } finally {
      setSaving(false)
    }
  }

  const editBook = async (id, book) => {
    setSaving(true)
    setError(null)
    try {
      const updated = await booksApi.updateBook(id, book)
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)))
      return updated
    } catch (err) {
      setError('Could not update the book. Please try again.')
      console.error(err)
      throw err
    } finally {
      setSaving(false)
    }
  }

  const removeBook = async (id) => {
    const previous = books
    setBooks((prev) => prev.filter((b) => b.id !== id))
    try {
      await booksApi.deleteBook(id)
    } catch (err) {
      setBooks(previous)
      setError('Could not delete the book. Please try again.')
      console.error(err)
    }
  }

  return { books, loading, saving, error, loadBooks, addBook, editBook, removeBook }
}