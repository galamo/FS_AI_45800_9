import LinearProgress from "@mui/material/LinearProgress"
import { useEffect } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import Spinner from "../../components/Spinner"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { clearDogsError, loadDogs } from "../../store/dogsReducer"
import "./dogs-layout.css"

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "dogs-layout__link dogs-layout__link--active" : "dogs-layout__link"
}

export default function DogsLayout() {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { breeds, status, error } = useAppSelector((state) => state.dogs)
  const isFirstLoad = breeds.length === 0 && (status === "idle" || status === "pending")
  const isRefreshing = status === "pending" && breeds.length > 0

  useEffect(() => {
    dispatch(loadDogs())
  }, [dispatch])

  return (
    <section className="dogs-layout">
      <nav className="dogs-layout__nav" aria-label="Dogs sections">
        <NavLink to="/dogs" end className={linkClass}>
          Breeds
        </NavLink>
        <NavLink to="/dogs/reports" className={linkClass}>
          Reports
        </NavLink>
      </nav>

      <ErrorMessage
        title="Could not load dog breeds"
        message={status === "failed" ? error : ""}
        onDismiss={() => {
          dispatch(clearDogsError())
        }}
      />

      {isRefreshing && <LinearProgress className="dogs-layout__progress" />}
      {isFirstLoad ? <Spinner message="Loading dog breeds…" /> : <Outlet />}
    </section>
  )
}
