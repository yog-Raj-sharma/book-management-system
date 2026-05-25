import { useState } from 'react'
import { GENRES } from '../../utils/constants'
import styles from './BookForm.module.css'

// Reused for both "Add" and "Edit". When `initialBook` is provided we're
// editing; otherwise we're adding. The parent passes onSubmit (which calls
// the hook's addBook/editBook) and onCancel.
const EMPTY = { title: '', author: '', genre: '', year: '' }

export default function BookForm({ initialBook, onSubmit, onCancel, saving }) {
  const [values, setValues] = useState(() =>
    initialBook
      ? {
          title: initialBook.title ?? '',
          author: initialBook.author ?? '',
          genre: initialBook.genre ?? '',
          year: initialBook.year ?? '',
        }
      : EMPTY,
  )
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear the field's error as the user corrects it.
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.title.trim()) next.title = 'Title is required.'
    if (!values.author.trim()) next.author = 'Author is required.'
    if (!values.genre) next.genre = 'Please choose a genre.'

    const yearNum = Number(values.year)
    const currentYear = new Date().getFullYear()
    if (!values.year) {
      next.year = 'Publication year is required.'
    } else if (!Number.isInteger(yearNum) || yearNum < 0 || yearNum > currentYear + 1) {
      next.year = `Enter a valid year up to ${currentYear + 1}.`
    }
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    // Normalise types before sending: year as a number, strings trimmed.
    await onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre,
      year: Number(values.year),
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. The Left Hand of Darkness"
          autoFocus
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          placeholder="e.g. Ursula K. Le Guin"
        />
        {errors.author && <span className={styles.error}>{errors.author}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={values.genre} onChange={handleChange}>
            <option value="" disabled>
              Select a genre
            </option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && <span className={styles.error}>{errors.genre}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            type="number"
            value={values.year}
            onChange={handleChange}
            placeholder="e.g. 1969"
          />
          {errors.year && <span className={styles.error}>{errors.year}</span>}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancel}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submit} disabled={saving}>
          {saving ? 'Saving…' : initialBook ? 'Save changes' : 'Add book'}
        </button>
      </div>
    </form>
  )
}