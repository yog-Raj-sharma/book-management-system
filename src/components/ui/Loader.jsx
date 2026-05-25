import styles from './Loader.module.css'

// Simple inline spinner with an optional label.
export default function Loader({ label = 'Loading…' }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}