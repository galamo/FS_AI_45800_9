import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Spinner from '../../components/Spinner'
import { clearLoginError, login } from '../../store/authReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import '../page.css'
import '../login-form.css'
import { hasLoginErrors, validateLogin, type LoginErrors } from '../login-validation'

export default function LoginPageState() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const isPending = status === 'pending'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [attempted, setAttempted] = useState(false)

  const showErrors = (nextUsername: string, nextPassword: string) => {
    const nextErrors = validateLogin({ username: nextUsername, password: nextPassword })
    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const nextErrors = showErrors(username, password)
    if (hasLoginErrors(nextErrors)) {
      dispatch(clearLoginError())
      return
    }

    const result = await dispatch(login({ username: username.trim(), password }))
    if (login.fulfilled.match(result)) {
      navigate('/jokes')
    }
  }

  return (
    <section className="page" aria-busy={isPending}>
      <Typography variant="h4" component="h2">
        Login with state
      </Typography>
      <p className="page__lead">
        User name and password live in useState. The login request runs through Redux, with a spinner while it is in progress.
      </p>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="User name"
          name="username"
          value={username}
          disabled={isPending}
          onChange={(event) => {
            const nextUsername = event.target.value
            setUsername(nextUsername)
            dispatch(clearLoginError())
            if (attempted) {
              showErrors(nextUsername, password)
            }
          }}
          error={Boolean(errors.username)}
          helperText={errors.username ?? 'At least 3 letters, numbers, or underscores'}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          disabled={isPending}
          onChange={(event) => {
            const nextPassword = event.target.value
            setPassword(nextPassword)
            dispatch(clearLoginError())
            if (attempted) {
              showErrors(username, nextPassword)
            }
          }}
          error={Boolean(errors.password)}
          helperText={errors.password ?? 'At least 6 characters, with a letter and a number'}
          autoComplete="current-password"
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Submit'}
        </Button>
        {isPending && <Spinner message="Signing in…" />}
        {status === 'failed' && error && (
          <Alert severity="error" role="alert">
            {error}
          </Alert>
        )}
      </form>
    </section>
  )
}
