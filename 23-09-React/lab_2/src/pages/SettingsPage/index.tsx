import Typography from '@mui/material/Typography'
import '../page.css'

export default function SettingsPage() {
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Settings
      </Typography>
      <p className="page__lead">
        Dummy settings route. Preferences and account options would live here.
      </p>
    </section>
  )
}
