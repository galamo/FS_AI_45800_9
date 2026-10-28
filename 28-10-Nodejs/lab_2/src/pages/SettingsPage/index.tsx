import MapIcon from '@mui/icons-material/Map'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useAppContext } from '../../context/AppContext'
import '../page.css'
import {  Schedule } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setShowMap } from '../../store/settingsReducer'
import { useEffect, useRef, useState } from 'react'
import { getTokenTtl, SettingsRequestError, updateTokenTtl } from './settings-api'

export default function SettingsPage() {
  const { settings, setSetting } = useAppContext()
  const { isLocalTime } = settings
  const showMap = useAppSelector((state) => state.settings.showMap)
  const dispatch = useAppDispatch()
  let showMapClickTimes = useRef(0);
  const [ttlMinutes, setTtlMinutes] = useState(15)
  const [savedTtlMinutes, setSavedTtlMinutes] = useState(15)
  const [canUpdateTtl, setCanUpdateTtl] = useState(false)
  const [ttlStatus, setTtlStatus] = useState<'loading' | 'ready' | 'saving'>('loading')
  const [ttlError, setTtlError] = useState('')
  const [ttlMessage, setTtlMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadTokenTtl() {
      try {
        const result = await getTokenTtl()
        if (cancelled) {
          return
        }

        setTtlMinutes(result.ttlMinutes)
        setSavedTtlMinutes(result.ttlMinutes)
        setCanUpdateTtl(result.canUpdate)
        setTtlStatus('ready')
      } catch (err) {
        if (cancelled) {
          return
        }

        const message = err instanceof SettingsRequestError ? err.message : 'The token TTL request failed.'
        setTtlError(message)
        setTtlStatus('ready')
      }
    }

    void loadTokenTtl()

    return () => {
      cancelled = true
    }
  }, [])

  const saveTokenTtl = async () => {
    setTtlStatus('saving')
    setTtlError('')
    setTtlMessage('')

    try {
      const result = await updateTokenTtl(ttlMinutes)
      setTtlMinutes(result.ttlMinutes)
      setSavedTtlMinutes(result.ttlMinutes)
      setCanUpdateTtl(result.canUpdate)
      setTtlMessage(`Login tokens will expire after ${result.ttlMinutes} minutes for the next user.`)
    } catch (err) {
      const message = err instanceof SettingsRequestError ? err.message : 'The token TTL update failed.'
      setTtlError(message)
    } finally {
      setTtlStatus('ready')
    }
  }
  
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
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          px: 2,
          py: 1.5,
        }}
      >
        <Typography component="h3" variant="body1">
          Login token lifetime
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {canUpdateTtl
            ? 'Minutes until the next login expires. Existing sessions keep their current expiry.'
            : 'Only an admin can change this. The slider shows the current server value.'}
        </Typography>
        <Slider
          min={1}
          max={30}
          step={1}
          marks={[
            { value: 1, label: '1' },
            { value: 15, label: '15' },
            { value: 30, label: '30' },
          ]}
          value={ttlMinutes}
          valueLabelDisplay="auto"
          disabled={!canUpdateTtl || ttlStatus !== 'ready'}
          onChange={(_, value) => {
            if (typeof value === 'number') {
              setTtlMinutes(value)
              setTtlMessage('')
            }
          }}
          aria-label="Login token lifetime in minutes"
        />
        <Typography variant="body2">{ttlMinutes} minutes</Typography>
        {canUpdateTtl ? (
          <Button
            variant="contained"
            disabled={ttlStatus !== 'ready' || ttlMinutes === savedTtlMinutes}
            onClick={() => {
              void saveTokenTtl()
            }}
          >
            Save token lifetime
          </Button>
        ) : null}
        {ttlError ? (
          <Alert severity="error" role="alert">
            {ttlError}
          </Alert>
        ) : null}
        {ttlMessage ? (
          <Alert severity="success" role="status">
            {ttlMessage}
          </Alert>
        ) : null}
      </Paper>
    </section>
  )
}
