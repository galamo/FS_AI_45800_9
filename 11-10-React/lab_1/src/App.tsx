import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import RouteErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'
import { AppProvider } from './context/AppContext'
import { store } from './store/store'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPageState = lazy(() => import('./pages/LoginPageState'))
const LoginPageRef = lazy(() => import('./pages/LoginPageRef'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const JokesPage = lazy(() => import('./pages/JokesPage'))
const DogsLayout = lazy(() => import('./pages/DogsPage/DogsLayout'))
const DogsPage = lazy(() => import('./pages/DogsPage'))
const DogsReportsPage = lazy(() => import('./pages/DogsPage/DogsReportsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function SuspenseRoute() {
  return (
    <Suspense fallback={<Spinner message="Loading page…" />}>
      <Outlet />
    </Suspense>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <RouteErrorBoundary>
            <Routes>
              <Route path="/" element={<AppShell />}>
                <Route element={<SuspenseRoute />}>
                  <Route index element={<HomePage />} />
                  <Route path="login-state" element={<LoginPageState />} />
                  <Route path="login-ref" element={<LoginPageRef />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                  <Route path="jokes" element={<JokesPage />} />
                  <Route path="dogs" element={<DogsLayout />}>
                    <Route index element={<DogsPage />} />
                    <Route path="reports" element={<DogsReportsPage />} />
                  </Route>
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Route>
            </Routes>
          </RouteErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </Provider>
  )
}
