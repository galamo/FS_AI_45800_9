import { useRef, useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import '../page.css'
import '../login-form.css'
import { loginSchema, validateLogin, type LoginErrors, type LoginFields } from './login-schema'

export default function LoginPageRef() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [signedInAs, setSignedInAs] = useState<string | null>(null)
  console.log('Login use Ref is Render ')

  const readFields = (): LoginFields => ({
    username: usernameRef.current?.value ?? '',
    password: passwordRef.current?.value ?? '',
  })

  const showErrors = (fields: LoginFields) => {
    const nextErrors = validateLogin(fields)
    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const fields = readFields()
    const parsed = loginSchema.safeParse(fields)
    if (!parsed.success) {
      showErrors(fields)
      setSignedInAs(null)
      return
    }
    setErrors({})
    setSignedInAs(parsed.data.username)
  }

  const handleChange = () => {
    setSignedInAs(null)
    if (attempted) {
      showErrors(readFields())
    }
  }

  return (
    <section className="page">
      <Typography variant="h4" component="h2">
        Login with ref
        <button type="button" onClick={() => console.log(`Login use Ref is Render ${usernameRef.current?.value ?? ''}`)}>
          Click me
        </button>
      </Typography>
      <p className="page__lead">
        User name and password stay in the inputs and are read with useRef. A Zod schema checks both fields after the first submit.
      </p>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="User name"
          name="username"
          inputRef={usernameRef}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username ?? 'At least 3 letters, numbers, or underscores'}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          inputRef={passwordRef}
          onChange={handleChange}
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
