import "./error-message.css"

type ErrorMessageProps = {
  message: string
  title: string
  onDismiss: () => void
}

export default function ErrorMessage(props: ErrorMessageProps) {
  const { message, title, onDismiss } = props

  if (!message) {
    return null
  }

  return (
    <div className="error-message__wrap">
      <div className="error-message" role="alert">
        <span className="error-message__icon" aria-hidden="true">
          !
        </span>
        <div className="error-message__body">
          <p className="error-message__title">{title}</p>
          <p className="error-message__text">{message}</p>
        </div>
        <button
          type="button"
          className="error-message__close"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          ×
        </button>
      </div>
    </div>
  )
}
