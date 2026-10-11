import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined'
import Button from '@mui/material/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import './error-fallback.css'

type ErrorFallbackProps = {
  onRetry: () => void
}

export default function ErrorFallback({ onRetry }: ErrorFallbackProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const goHome = () => {

   
      // navigate('/')
      window.location.href = "/"
  }

  return (
    <section className="error-fallback" role="alert">
      <div className="error-fallback__card">
        <div className="error-fallback__icon" aria-hidden="true">
          <ErrorOutlineIcon fontSize="inherit" />
        </div>
        <h2 className="error-fallback__title">Sorry, something went wrong</h2>
        <p className="error-fallback__text">
          This part of the app ran into a problem and could not be shown.
        </p>
        <div className="error-fallback__actions">
          <Button variant="contained" onClick={onRetry}>
            Try again
          </Button>
          <Button variant="outlined" onClick={goHome}>
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )
}
