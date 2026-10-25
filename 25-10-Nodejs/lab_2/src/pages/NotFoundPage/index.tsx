import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import '../page.css'

export default function NotFoundPage() {
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Page not found
      </Typography>
      <p className="page__lead">
        That address does not match a route in this app.
      </p>
      <Button component={RouterLink} to="/" variant="contained">
        Back to Home
      </Button>
    </section>
  )
}
