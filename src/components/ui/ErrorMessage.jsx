import styles from './ErrorMessage.module.css'

// Shows an error with an optional retry action.
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}