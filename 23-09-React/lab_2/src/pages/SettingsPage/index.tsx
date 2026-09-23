import MapIcon from '@mui/icons-material/Map'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useAppContext } from '../../context/AppContext'
import '../page.css'
import {  Schedule } from '@mui/icons-material'

export default function SettingsPage() {
  const { settings, setSetting } = useAppContext()
  const { showMap, isLocalTime } = settings

  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Settings
      </Typography>
      <p className="page__lead">
        Preferences that apply across the app.
      </p>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
        }}
      >
        {showMap ? (
          <MapIcon color="primary" aria-hidden />
        ) : (
          <MapOutlinedIcon color="action" aria-hidden />
        )}
        <FormControlLabel
          sx={{ flex: 1, m: 0, justifyContent: 'space-between' }}
          labelPlacement="start"
          label={
            <Typography component="span" variant="body1">
              Show users map
            </Typography>
          }
          control={
            <Switch
              checked={showMap}
              onChange={(_, checked) => {
                setSetting('showMap', checked)
              }}
              inputProps={{ 'aria-label': 'Show users map' }}
            />
          }
        />
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
        }}
      >
    
        <Schedule color="primary" aria-hidden />
    
        <FormControlLabel
          sx={{ flex: 1, m: 0, justifyContent: 'space-between' }}
          labelPlacement="start"
          label={
            <Typography component="span" variant="body1">
             Local Time
            </Typography>
          }
          control={
            <Switch
              checked={isLocalTime}
              onChange={(_, checked) => {
                setSetting('isLocalTime', checked)
              }}
              
            />
          }
        />
      </Paper>
    </section>
  )
}
