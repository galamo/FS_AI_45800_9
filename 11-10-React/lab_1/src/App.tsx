import { lazy, Suspense, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import RouteErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'
import { AppProvider } from './context/AppContext'
import DashboardPage from './pages/DashboardPage'
import DogsLayout from './pages/DogsPage/DogsLayout'
import DogsPage from './pages/DogsPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
// import JokesPage from './pages/JokesPage'
const JokesPage = lazy(() => import('./pages/JokesPage'))
import LoginPageRef from './pages/LoginPageRef'
import LoginPageState from './pages/LoginPageState'
import NotFoundPage from './pages/NotFoundPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import { store } from './store/store'
// import UsersPage from './pages/UsersPage'
// import DogsReportsPage from './pages/DogsPage/DogsReportsPage'
const UsersPage = lazy(() => import('./pages/UsersPage'))
const DogsReportsPage = lazy(() => import('./pages/DogsPage/DogsReportsPage'))

function SuspenseRoute({ children, message }: { children: ReactNode; message: string }) {
  return <Suspense fallback={<Spinner message={message} />}>{children}</Suspense>
}

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <RouteErrorBoundary>
            <Routes>
              <Route path="/" element={<AppShell />}>
                <Route index element={<HomePage />} />
                <Route path="login-state" element={<LoginPageState />} />
                <Route path="login-ref" element={<LoginPageRef />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route
                  path="users"
                  element={
                     <SuspenseRoute message="Loading users…">
                      <UsersPage />
                     </SuspenseRoute>
                  }
                />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="jokes" element={
                  <SuspenseRoute message="Loading jokes…">
                    <JokesPage />
                  </SuspenseRoute>
                } />
                <Route path="dogs" element={<DogsLayout />}>
                  <Route index element={<DogsPage />} />
                  <Route
                    path="reports"
                    element={
                      <SuspenseRoute message="Loading dog reports…">
                        <DogsReportsPage />
                       </SuspenseRoute>
                    }
                  />
                </Route>
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </RouteErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </Provider>
  )
}
