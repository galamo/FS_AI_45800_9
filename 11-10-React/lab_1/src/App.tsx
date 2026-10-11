import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import RouteErrorBoundary from './components/ErrorBoundary'
import { AppProvider } from './context/AppContext'
import DashboardPage from './pages/DashboardPage'
import DogsLayout from './pages/DogsPage/DogsLayout'
import DogsPage from './pages/DogsPage'
import DogsReportsPage from './pages/DogsPage/DogsReportsPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import JokesPage from './pages/JokesPage'
import LoginPageRef from './pages/LoginPageRef'
import LoginPageState from './pages/LoginPageState'
import NotFoundPage from './pages/NotFoundPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import UsersPage from './pages/UsersPage'
import { store } from './store/store'

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
            </Routes>
          </RouteErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </Provider>
  )
}
