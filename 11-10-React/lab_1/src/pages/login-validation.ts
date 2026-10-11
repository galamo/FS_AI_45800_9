export type LoginFields = {
  username: string
  password: string
}

export type LoginErrors = {
  username?: string
  password?: string
}

const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/

export function validateLogin({ username, password }: LoginFields): LoginErrors {
  const errors: LoginErrors = {}
  const trimmedUsername = username.trim()

  if (!trimmedUsername) {
    errors.username = 'User name is required'
  } else if (trimmedUsername.length < 3) {
    errors.username = 'User name must be at least 3 characters'
  } else if (!USERNAME_PATTERN.test(trimmedUsername)) {
    errors.username = 'Use only letters, numbers, and underscores'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Include at least one letter and one number'
  }

  return errors
}

export function hasLoginErrors(errors: LoginErrors): boolean {
  return Boolean(errors.username || errors.password)
}
