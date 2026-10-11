import { useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import '../page.css'
import '../login-form.css'
import { hasLoginErrors, validateLogin, type LoginErrors } from '../login-validation'

export default function LoginPageState() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [signedInAs, setSignedInAs] = useState<string | null>(null)
 console.log("XComponent Login is render???w")
  const showErrors = (nextUsername: string, nextPassword: string) => {
    const nextErrors = validateLogin({ username: nextUsername, password: nextPassword })
    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const nextErrors = showErrors(username, password)
    if (hasLoginErrors(nextErrors)) {
      setSignedInAs(null)
      return
    }
    setSignedInAs(username.trim())
  }

  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Login with state
      </Typography>
      <p className="page__lead">
        User name and password live in useState. Typing updates that state, and validation runs again after the first submit.
      </p>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="User name"
          name="username"
          value={username}
          onChange={(event) => {
            const nextUsername = event.target.value
            setUsername(nextUsername)
            setSignedInAs(null)
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
          onChange={(event) => {
            const nextPassword = event.target.value
            setPassword(nextPassword)
            setSignedInAs(null)
            if (attempted) {
              showErrors(username, nextPassword)
            }
          }}
          error={Boolean(errors.password)}
          helperText={errors.password ?? 'At least 6 characters, with a letter and a number'}
          autoComplete="current-password"
          fullWidth
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        {signedInAs && (
          <Alert severity="success" role="status">
            Welcome, {signedInAs}.
          </Alert>
        )}
      </form>
    </section>
  )
}
