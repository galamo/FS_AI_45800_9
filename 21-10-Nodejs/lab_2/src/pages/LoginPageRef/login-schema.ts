import { z } from 'zod'
// client, forms, backend, input validation db, 
export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'User name is required')
    .min(3, 'User name is invalid')
    .regex(/^[A-Za-z0-9_]+$/, 'Use only letters, numbers, and underscores'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Include at least one letter and one number'),

})

export type LoginFields = z.input<typeof loginSchema>

export type LoginErrors = {
  username?: string
  password?: string
}

export function validateLogin(fields: LoginFields): LoginErrors {
  const result = loginSchema.safeParse(fields)
  console.log(result)
  if (result.success) {
    return {}
  }

  const { fieldErrors } = z.flattenError(result.error)
  return {
    username: fieldErrors.username?.[0],
    password: fieldErrors.password?.[0],
  }
}

export function hasLoginErrors(errors: LoginErrors): boolean {
  return Boolean(errors.username || errors.password)
}
