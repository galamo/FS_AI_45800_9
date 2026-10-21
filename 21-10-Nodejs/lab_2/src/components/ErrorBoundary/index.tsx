import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import ErrorFallback from './ErrorFallback'

type ErrorBoundaryProps = {
  children: ReactNode
  resetOnNavigate?: boolean
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error boundary caught a render error', error, info.componentStack)
  }

  reset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.reset} />
    }

    return this.props.children
  }
}

export default function RouteErrorBoundary({ children, resetOnNavigate = false }: ErrorBoundaryProps) {
  const { pathname } = useLocation()
  const boundaryKey = resetOnNavigate ? pathname : 'app'

  return <ErrorBoundary key={boundaryKey}>{children}</ErrorBoundary>
}
