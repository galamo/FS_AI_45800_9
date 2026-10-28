import { Navigate, Outlet } from 'react-router-dom'

const LOGIN_PATH = '/login-state'

export default function RequireAuth() {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to={LOGIN_PATH} replace />
  }

  return <Outlet />
}
