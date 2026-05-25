import { GENRES, ALL_GENRES } from '../../utils/constants'
import styles from './BookFilters.module.css'

// Controlled inputs: the parent owns the search/genre state and passes
// it down, so filtering logic lives in one place (the page).
export default function BookFilters({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  resultCount,
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">⌕</span>
        <input
          className={styles.search}
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or author…"
          aria-label="Search books"
        />
      </div>

      <select
        className={styles.genre}
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        aria-label="Filter by genre"
      >
        <option value={ALL_GENRES}>{ALL_GENRES}</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <span className={styles.count}>
        {resultCount} {resultCount === 1 ? 'book' : 'books'}
      </span>
    </div>
  )
}