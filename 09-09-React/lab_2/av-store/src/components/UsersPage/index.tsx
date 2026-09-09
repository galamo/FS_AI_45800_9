import axios from "axios"
import { useEffect, useState } from "react"
import "./users-page.css"
import type { SingleUserType } from "./user-type"
import { getUsersApi } from "./users-api"

export default function UsersPage() {
  const [usersData, setUsersData] = useState<Array<SingleUserType>>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUsersApi() {
      try {
        setIsLoading(true)
        setError("")
        const result = await getUsersApi()
        setUsersData(result)
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to load users"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsersApi()
  }, [])

  return (
    <section className="users-page" aria-busy={isLoading}>
      <header className="users-page__header">
        <h1>Users</h1>
        <p className="users-page__subtitle">People loaded from Random User</p>
      </header>

      {error && (
        <div className="users-page__toast-wrap">
          <div className="users-page__toast" role="alert">
            <span className="users-page__toast-icon" aria-hidden="true">
              !
            </span>
            <div className="users-page__toast-body">
              <p className="users-page__toast-title">Could not load users</p>
              <p className="users-page__toast-message">{error}</p>
            </div>
            <button
              type="button"
              className="users-page__toast-close"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="users-page__loading" role="status" aria-live="polite">
          <span className="users-page__spinner" aria-hidden="true" />
          <p>Loading users…</p>
        </div>
      )}

      {!isLoading && (
        <ul className="users-page__list">
          {usersData.map((singleUser, index) => (
            <li key={`${singleUser.name.first}-${singleUser.name.last}-${index}`}>
              <span className="users-page__gender">[{singleUser.gender}]</span>
              {singleUser.name.first} {singleUser.name.last}
              <button onClick={()=>{
                const restOfUsersWithoutThisOne = usersData.filter((user)=> user?.name?.last !== singleUser?.name?.last &&
                 user?.name?.first !== singleUser?.name?.first)
                setUsersData(restOfUsersWithoutThisOne)
              }}>
                Remove User
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="users-page__actions">
        <button
          type="button"
          className="users-page__load-more"
          aria-label="Clear all data"
          disabled={isLoading || usersData.length === 0}
          onClick={() => {
            setUsersData([])
          }}
        >
          Clear all Data
        </button>
      </div>


    </section>
  )
}



