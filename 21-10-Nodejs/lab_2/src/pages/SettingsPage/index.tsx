import MapIcon from '@mui/icons-material/Map'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useAppContext } from '../../context/AppContext'
import '../page.css'
import {  Schedule } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setShowMap } from '../../store/settingsReducer'
import { useRef } from 'react'

export default function SettingsPage() {
  const { settings, setSetting } = useAppContext()
  const { isLocalTime } = settings
  const showMap = useAppSelector((state) => state.settings.showMap)
  const dispatch = useAppDispatch()
  let showMapClickTimes = useRef(0);
  
  console.log("Component Settings is render????")
  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Settings {showMapClickTimes.current} 
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
                dispatch(setShowMap(checked))
                console.log(showMapClickTimes.current, "showMapClickTimes.current")
                showMapClickTimes.current = showMapClickTimes.current + 1;
                if(showMapClickTimes.current > 3 ){
                  alert("Stop Spam the Client!!")
                }
              }}
              slotProps={{
                input: { 'aria-label': 'Show users map' },
              }}
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
