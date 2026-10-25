import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

const LOGIN_PATH = '/login-state'

export default function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithAuth(props: P) {
    const token = localStorage.getItem('token')
    if (!token) {
      return <Navigate to={LOGIN_PATH} replace />
    }

    return <WrappedComponent {...props} />
  }

  const wrappedName = WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  WithAuth.displayName = `withAuth(${wrappedName})`

  return WithAuth
}
