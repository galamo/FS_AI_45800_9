export type RegisterFields = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type RegisterErrors = {
  username?: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}

const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRegister({
  username,
  email,
  password,
  firstName,
  lastName,
}: RegisterFields): RegisterErrors {
  const errors: RegisterErrors = {}
  const trimmedUsername = username.trim()
  const trimmedEmail = email.trim()
  const trimmedFirstName = firstName.trim()
  const trimmedLastName = lastName.trim()

  if (!trimmedUsername) {
    errors.username = 'User name is required'
  } else if (trimmedUsername.length < 3) {
    errors.username = 'User name must be at least 3 characters'
  } else if (!USERNAME_PATTERN.test(trimmedUsername)) {
    errors.username = 'Use only letters, numbers, and underscores'
  }

  if (!trimmedEmail) {
    errors.email = 'Email is required'
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Email must be valid'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!trimmedFirstName) {
    errors.firstName = 'First name is required'
  }

  if (!trimmedLastName) {
    errors.lastName = 'Last name is required'
  }

  return errors
}

export function hasRegisterErrors(errors: RegisterErrors): boolean {
  return Boolean(
    errors.username || errors.email || errors.password || errors.firstName || errors.lastName,
  )
}
