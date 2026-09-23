import Typography from '@mui/material/Typography'
import '../page.css'

export default function ReportsPage() {
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Reports
      </Typography>
      <p className="page__lead">
        Dummy reports route. Charts and exported summaries would live here.
        This is the report for ALmog he will recieve email once clicking here : HERE
      </p>
    </section>
  )
}
