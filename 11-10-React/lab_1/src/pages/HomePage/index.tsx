import Typography from '@mui/material/Typography'
import '../page.css'

export default function HomePage() {
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Home
      </Typography>
      <p className="page__lead">
        Dummy home route. This page stands in for the landing section of the app.
      </p>
    </section>
  )
}
