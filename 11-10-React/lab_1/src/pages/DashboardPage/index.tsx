import Typography from '@mui/material/Typography'
import '../page.css'

export default function DashboardPage() {
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Dashboard
      </Typography>
      <p className="page__lead">
        Dummy dashboard route. Summary widgets and activity would live here.
      </p>
    </section>
  )
}
