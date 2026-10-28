import { useState, type FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Spinner from '../../components/Spinner'
import { clearRegisterError, register } from '../../store/authReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import '../page.css'
import '../login-form.css'
import { hasRegisterErrors, validateRegister, type RegisterErrors, type RegisterFields } from '../register-validation'

const emptyFields: RegisterFields = {
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
}

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { registerStatus, registerError } = useAppSelector((state) => state.auth)
  const isPending = registerStatus === 'pending'
  const [fields, setFields] = useState<RegisterFields>(emptyFields)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [attempted, setAttempted] = useState(false)

  const showErrors = (nextFields: RegisterFields) => {
    const nextErrors = validateRegister(nextFields)
    setErrors(nextErrors)
    return nextErrors
  }

  const updateField = (key: keyof RegisterFields, value: string) => {
    const nextFields = { ...fields, [key]: value }
    setFields(nextFields)
    dispatch(clearRegisterError())
    if (attempted) {
      showErrors(nextFields)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const nextErrors = showErrors(fields)
    if (hasRegisterErrors(nextErrors)) {
      dispatch(clearRegisterError())
      return
    }

    const result = await dispatch(
      register({
        username: fields.username.trim(),
        email: fields.email.trim(),
        password: fields.password,
        firstName: fields.firstName.trim(),
        lastName: fields.lastName.trim(),
      }),
    )

    if (register.fulfilled.match(result)) {
      navigate('/login-state')
    }
  }

  return (
    <section className="page" aria-busy={isPending}>
      <Typography variant="h4" component="h2">
        Register
      </Typography>
      <p className="page__lead">
        Create an account with the lab 1 register API. The request runs through Redux, and a successful response opens the login page.
      </p>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="User name"
          name="username"
          value={fields.username}
          disabled={isPending}
          onChange={(event) => updateField('username', event.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username ?? 'At least 3 letters, numbers, or underscores'}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          disabled={isPending}
          onChange={(event) => updateField('email', event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email ?? 'A valid email address'}
          autoComplete="email"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={fields.password}
          disabled={isPending}
          onChange={(event) => updateField('password', event.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password ?? 'At least 6 characters'}
          autoComplete="new-password"
          fullWidth
        />
        <TextField
          label="First name"
          name="firstName"
          value={fields.firstName}
          disabled={isPending}
          onChange={(event) => updateField('firstName', event.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName ?? ' '}
          autoComplete="given-name"
          fullWidth
        />
        <TextField
          label="Last name"
          name="lastName"
          value={fields.lastName}
          disabled={isPending}
          onChange={(event) => updateField('lastName', event.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName ?? ' '}
          autoComplete="family-name"
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Creating account…' : 'Register'}
        </Button>
        {isPending && <Spinner message="Creating account…" />}
        {registerStatus === 'failed' && registerError && (
          <Alert severity="error" role="alert">
            {registerError}
          </Alert>
        )}
        <Link component={RouterLink} to="/login-state">
          Already have an account? Sign in
        </Link>
      </form>
    </section>
  )
}
