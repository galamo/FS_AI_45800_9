import "./spinner.css"

type SpinnerProps = {
  message: string
}

export default function Spinner(props: SpinnerProps) {
  const { message } = props

  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__circle" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
